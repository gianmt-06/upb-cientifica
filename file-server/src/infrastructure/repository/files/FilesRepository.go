package repository

import (
	"fmt"
	"gogrpcserver/src/domain"
	"gogrpcserver/src/helper"
	"gogrpcserver/src/infrastructure/database"
	"gogrpcserver/src/infrastructure/datamapper"
	repository "gogrpcserver/src/infrastructure/repository/metadata"
	"gogrpcserver/src/util"
	"io/fs"
	"mime"
	"os"
	"path"
	"path/filepath"
	"strconv"
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

// type FilesRepository interface {
// 	getOne(path string) ()
// 	getAll() ()
// 	delete()
// 	save()

// }
var (
	mapper = datamapper.NewDatamapper()
)

type FilesRepository struct {
	storage  *database.Storage
	metadata *repository.MetadataRepository
}

func NewFilesRepository(storage *database.Storage, metadata *repository.MetadataRepository) (*FilesRepository) {
	return &FilesRepository{
		storage:  storage,
		metadata: metadata,
	}
}

func (repository *FilesRepository) Save(fileName string, fingerprint string, owner string) (*os.File, string, error) {
	fileName = util.CleanName(fileName)

	dbFolder, err := repository.metadata.GetOne("fingerprint", fingerprint)

	if err != nil {
		return nil, "", err
	}

	destinationpath := helper.GetSystemPath(dbFolder.Path)
	relativepath := path.Join(dbFolder.Path, fileName)

	exists := repository.storage.Exists(relativepath)

	fileFingerprint := helper.GetFileFingerprint([]byte(relativepath))

	if !exists {
		fileType := filepath.Ext(fileName)

		repository.metadata.Insert(&domain.FileDoc{
			Fingerprint: fileFingerprint,
			Path:        relativepath,
			Size:        0,
			Permissions: fmt.Sprintf("%04o", 0700),
			Owner:       owner,
			Modified:    time.Now(),
			MimeType:    mime.TypeByExtension(fileType),
		})
	} else {
		repository.metadata.Update(fileFingerprint, bson.M{
			// "size":        fileInfo.Size(),
			"permissions": fmt.Sprintf("%04o", 0700),
			"modified":    time.Now(),
		})
	}

	file, err := os.OpenFile(path.Join(destinationpath, fileName), os.O_CREATE|os.O_WRONLY|os.O_TRUNC, 0700)

	if err != nil {
		return nil, "", err
	}

	return file, fileFingerprint, nil
}

func (repository *FilesRepository) CreateFolder(parentHash string, name string, owner string) (*domain.File, error) {
	name = util.CleanName(name)
	parentFolder, err := repository.metadata.GetOne("fingerprint", parentHash)

	if err != nil {
		return nil, fmt.Errorf("parent folder metadata not found")
	}

	exists := repository.storage.Exists(parentFolder.Path)

	if !exists {
		return nil, fmt.Errorf("parent folder not found")
	}

	relative := path.Join(parentFolder.Path, name)
	created, err := repository.storage.CreateFolder(relative)

	if err != nil {
		return nil, fmt.Errorf("folder creation error %s", err)
	}

	folderhash := helper.GetFileFingerprint([]byte(relative))

	domainFile := domain.NewFile(
		relative,
		folderhash,
		created.Size(),
		owner,
		"0700",
		time.Now(),
		"dir",
	)

	dbFile := mapper.ToDatabase(domainFile)
	ok := repository.metadata.Insert(dbFile)

	if ok != nil {
		return nil, fmt.Errorf("metadata not found")
	}

	return domainFile, nil
}

func (repository *FilesRepository) WriteFile(file *os.File, data []byte) error {
	return repository.storage.Write(file, data)
}

func (repository *FilesRepository) GetOne(fingerprint string) (*domain.File, error) {
	dbFile, err := repository.metadata.GetOne("fingerprint", fingerprint)

	if err != nil {
		return nil, err
	}

	file := mapper.ToDomain(dbFile)

	return file, nil
}

func (repository *FilesRepository) GetOpenFile(fingerprint string) (*os.File, error) {
	dbFile, err := repository.metadata.GetOne("fingerprint", fingerprint)

	if err != nil {
		return nil, fmt.Errorf("metadata not found")
	}

	file, err := repository.storage.OpenFile(dbFile.Path)

	if err != nil {
		return nil, fmt.Errorf("error reading file: %s", err)
	}

	return file, nil
}

func (repository *FilesRepository) GetAlbumFiles(username string) ([]*domain.File, error) {
	var pictures []*domain.File
	_, err := repository.metadata.GetOne("path", "/"+username)

	if err != nil {
		return nil, fmt.Errorf("home folder for %s not found", username)
	}

	fullHomePath := helper.GetSystemPath(username)

	err = filepath.WalkDir(fullHomePath, func(path string, file os.DirEntry, err error) error {
		if err != nil {
			util.Log("error", err)
		}

		if !file.IsDir() && util.IsImage(file.Name()) {
			relative, err := filepath.Rel(fullHomePath, path)

			if err != nil {
				util.Log("error", err)
				return err
			}

			dbFile, err := repository.metadata.GetOne("path", fmt.Sprintf("/%s/%s", username, relative))

			if err != nil {
				util.Log("error", err)
				return err
			}

			domainFile := mapper.ToDomain(dbFile)
			pictures = append(pictures, domainFile)

		}
		return nil
	})

	if err != nil {
		return nil, err
	}

	return pictures, nil
}

func (repository *FilesRepository) GetShared(username string, groups []string) ([]*domain.File, error) {
	root, err := repository.storage.GetAll("/")
	var shared []*domain.File 

	if err != nil {
		return nil, fmt.Errorf("root folder not found. %s", err)
	}

	for _, home := range root {
		if home.Name() == username {
			continue
		}

		fullHomePath := helper.GetSystemPath(fmt.Sprintf("/%s", home.Name()))

		err := filepath.WalkDir(fullHomePath, func(path string, d os.DirEntry, err error) error {
			if err != nil {
				return err
			}

			if filepath.Base(path) == "mpi" {
				return filepath.SkipDir
			}

			relativePath := helper.GetRelativePath("/", path)

			if relativePath == "" {
				util.Log("error", "relativepath error")
				return nil
			}

			if filepath.Base(path) != home.Name() {
				if util.HaveReadPerms(username, groups, fmt.Sprintf("/%s", relativePath)) {
					dbFile, err := repository.metadata.GetOne("path", fmt.Sprintf("/%s", relativePath))

					if err != nil {
						util.Log("error", fmt.Sprintf("%s metadata not found", relativePath))
						return nil
					}

					file := mapper.ToDomain(dbFile);

					if err != nil {
						fmt.Println("No file in server")
					} else {

						shared = append(shared, file);

						if file.GetMimetype() == "dir" {
							return filepath.SkipDir
						}
					}

				}
			}
			return nil
		})

		if err != nil {
			return nil, err
		}
	}

	return shared, nil
}

func (repository *FilesRepository) GetAll(folderFingerprint string) ([]*domain.File, string, error) {
	var domainFiles []*domain.File
	folderDb, err := repository.metadata.GetOne("fingerprint", folderFingerprint)

	if err != nil {
		return nil, "", err
	}

	files, err := repository.storage.GetAll(folderDb.Path)

	if err != nil {
		return nil, "", err
	}

	for _, file := range files {
		data, err := file.Info()

		if err != nil {
			continue
		}

		dbFile, err := repository.metadata.GetOne("path", path.Join(folderDb.Path, data.Name()))

		if err != nil {
			continue
		}

		domainFiles = append(domainFiles, mapper.ToDomain(dbFile))
	}

	return domainFiles, folderDb.Path, nil
}

func (repository *FilesRepository) Delete(hash string) error {
	dbFile, err := repository.metadata.GetOne("fingerprint", hash)

	if err != nil {
		return err
	}

	if filepath.Base(dbFile.Path) == "mpi" {
		return fmt.Errorf("protected folder MPI")
	}

	err = repository.storage.Delete(dbFile.Path)

	if err != nil {
		return err
	}

	if dbFile.MimeType == "dir" {
		err = repository.metadata.DeleteMany(dbFile.Path)
	} else {
		err = repository.metadata.Delete(dbFile.Fingerprint)
	}

	if err != nil {
		return err
	}

	return nil
}

func (repository *FilesRepository) ChangePermissions(hash string, permissions string) error {
	dbFile, err := repository.metadata.GetOne("fingerprint", hash);

	if err != nil {
		util.Log("error", err)
		return fmt.Errorf("file not found. Hash: %v", err)
	}

	uintPermissions, err := strconv.ParseUint(permissions, 8, 32);

	if err != nil {
		util.Log("error", "Invalid permissions")
		return fmt.Errorf("invalid permissions %s", permissions)
	}

	err = repository.storage.Chmod(dbFile.Path, fs.FileMode(uintPermissions))

	if err != nil {
		util.Log("error", err)
		return fmt.Errorf("error. %s", err)
	}

	err = repository.metadata.Update(hash, bson.M{
		"permissions": permissions,
	})

	if err != nil {
		return fmt.Errorf("update metadata error %s", err)
	}

	return nil
}