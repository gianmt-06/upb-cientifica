package files

import (
	"context"
	"fmt"
	"gogrpcserver/src/helper"
	"gogrpcserver/src/infrastructure/datamapper"
	service "gogrpcserver/src/infrastructure/grpcserver/services/files"
	files "gogrpcserver/src/infrastructure/repository/files"
	metadata "gogrpcserver/src/infrastructure/repository/metadata"
	"gogrpcserver/src/util"
	"io"
	"os"

	"go.mongodb.org/mongo-driver/bson"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
)

var (
	mapper = datamapper.NewDatamapper()
)

type fileserver struct {
	service.UnimplementedFilesRouteServer
	filesRepository    *files.FilesRepository
	metadataRepository *metadata.MetadataRepository
}

func NewServer(server grpc.ServiceRegistrar, filesRepository *files.FilesRepository, metadataRepository *metadata.MetadataRepository) {
	fileServer := &fileserver{
		filesRepository:    filesRepository,
		metadataRepository: metadataRepository,
	}
	service.RegisterFilesRouteServer(server, fileServer)
}

func (server *fileserver) Ping(ctx context.Context, in *service.PingRequest) (*service.PingReply, error) {
	return &service.PingReply{Message: "pong"}, nil
}

func (server *fileserver) GetCustomFiles(ctx context.Context, request *service.GetCustomFilesRequest) (*service.GetCustomFilesResponse, error) {
	var folderFiles []*service.File

	folderDb, err := server.metadataRepository.GetOne("path", fmt.Sprintf("/%s", request.GetUser()))

	if request.GetFolder() == "mpi" {
		folderDb, err = server.metadataRepository.GetOne("path", fmt.Sprintf("/%s/mpi", request.GetUser()))
	}

	if err != nil {
		util.Log("error", err)

		return &service.GetCustomFilesResponse{
			Response: &service.Response{
				Succes:  false,
				Code:    uint32(codes.NotFound),
				Message: fmt.Sprintf("Cannot read directory: %s: No such file or directory for ", request.GetUser()),
			},
			Files:       folderFiles,
			Fingerprint: "",
		}, nil
	}

	files, _, err := server.filesRepository.GetAll(folderDb.Fingerprint)

	if err != nil {
		util.Log("error", err)
		return &service.GetCustomFilesResponse{
			Response: &service.Response{
				Succes:  false,
				Code:    uint32(codes.NotFound),
				Message: fmt.Sprintf("Cannot read directory: %s: No such file or directory for ", request.GetUser()),
			},
			Files:       folderFiles,
			Fingerprint: "",
		}, nil
	}

	for _, file := range files {
		folderFiles = append(folderFiles, mapper.ToService(file))
	}

	util.Log("Success", fmt.Sprintf("Get Home Files Success home:%s", folderDb.Path))
	return &service.GetCustomFilesResponse{
		Response: &service.Response{
			Succes:  true,
			Code:    uint32(codes.OK),
			Message: "Successfully obtained files",
		},
		Files:       folderFiles,
		Fingerprint: folderDb.Fingerprint,
	}, nil
}

func (server *fileserver) GetHomeSize(ctx context.Context, request *service.GetHomeSizeRequest) (*service.GetHomeSizeResponse, error) {
	folderDb, err := server.metadataRepository.GetOne("path", fmt.Sprintf("/%s", request.GetUser()))

	if err != nil {
		util.Log("error", err)
		return &service.GetHomeSizeResponse{
			Size: -1,
		}, nil
	}

	osPath := helper.GetSystemPath(folderDb.Path);
	size := util.GetFolderSize(osPath)

	util.Log("Success", fmt.Sprintf("Get Home Size Success home:%s", folderDb.Path))
	return &service.GetHomeSizeResponse{
		Size: size,
	}, nil
}

func (server *fileserver) GetFolderFiles(ctx context.Context, request *service.GetAllFilesRequest) (*service.GetAllFilesResponse, error) {
	var folderFiles []*service.File

	files, folderPath, err := server.filesRepository.GetAll(request.GetFolderFingerprint());

	if err != nil {
		return &service.GetAllFilesResponse{
			Response: &service.Response{
				Succes:  false,
				Code:    uint32(codes.NotFound),
				Message: "Error",
			},
			Folderpath: folderPath,
			Files:      folderFiles,
		}, nil
	}

	for _, file := range files {
		folderFiles = append(folderFiles, mapper.ToService(file))
	}

	util.Log("success", "Successfully obtained files")
	
	return &service.GetAllFilesResponse{
		Response: &service.Response{
			Succes:  true,
			Code:    uint32(codes.OK),
			Message: "Successfully obtained files",
		},
		Folderpath: folderPath,
		Files:      folderFiles,
	}, nil
}

func (server *fileserver) GetProperties(ctx context.Context, request *service.GetFileRequest) (*service.GetFileResponse, error) {
	fileData, err := server.filesRepository.GetOne(request.GetFingerprint());

	if err != nil {
		return &service.GetFileResponse{
			Response: &service.Response{
				Succes:  false,
				Code:    uint32(codes.NotFound),
				Message: "Error",
			},
		}, err
	}

	file := mapper.ToService(fileData);

	util.Log("success", "Metadata of the file successfully obtained")

	return &service.GetFileResponse{
		Response: &service.Response{
			Succes:  true,
			Code:    uint32(codes.OK),
			Message: "Metadata of the file successfully obtained",
		},
		File: file,
	}, nil
}

func (server *fileserver) DeleteFile(ctx context.Context, request *service.DeleteFileRequest) (*service.DeleteFileResponse, error) {
	message := "Success"
	
	err := server.filesRepository.Delete(request.GetFingerprint())
	
	if err != nil {
		message = "Error"
	}

	util.Log("success", message)
	return &service.DeleteFileResponse{
		Response: &service.Response{
			Succes:  err == nil,
			Code:    uint32(codes.OK),
			Message: message,
		},
	}, nil
}

func (server *fileserver) Upload(stream service.FilesRoute_UploadServer) (err error) {
	util.Log("info", "Uploading...")

	firstChunk := true
	var request *service.FileUploadRequest
	var file *os.File
	var fingerprint string;

	for {
		request, err = stream.Recv()

		if err != nil {
			util.Log("error", err)
			if err == io.EOF {
				break
			}
			break
		}

		if firstChunk {
			file, fingerprint, err = server.filesRepository.Save(
				request.GetFileName(),
				request.GetFolderFingerprint(),
				request.GetUsername(),
			)

			if err != nil {
				return err
			}

			defer file.Close()

			firstChunk = false
		}

		err = server.filesRepository.WriteFile(file, request.GetChunk())

		if err != nil {
			util.Log("err", err)
			return
		}
	}

	created, err := server.metadataRepository.GetOne("fingerprint", fingerprint);

	if err != nil {
		return
	}

	data, err := os.Stat(helper.GetSystemPath(created.Path));

	if err != nil {
		return
	}

	server.metadataRepository.Update(fingerprint, bson.M{
		"size":        data.Size(),
	})

	uploadedFile, err := server.GetProperties(stream.Context(), &service.GetFileRequest{
		Fingerprint: fingerprint,
	})

	if err != nil {
		util.Log("err", err)
		return
	}

	err = stream.SendAndClose(&service.FileUploadResponse{
		File: uploadedFile.GetFile(),
	})

	util.Log("success", "File successfully uploaded")
	return
}

func (server *fileserver) CreateFolder(ctx context.Context, request *service.CreateFolderRequest) (*service.CreateFolderResponse, error) {
	createdFolder, err := server.filesRepository.CreateFolder(
		request.GetFolderFingerprint(), 
		request.GetFolderName(), 
		request.GetOwner(),
	);

	if err != nil {
		util.Log("error", err)
		return &service.CreateFolderResponse{
			Response: &service.Response{
				Succes:  false,
				Code:    uint32(codes.Canceled),
				Message: err.Error(),
			},
		}, nil
	}

	folderResponse := mapper.ToService(createdFolder);

	return &service.CreateFolderResponse{
		Response: &service.Response{
			Succes:  err == nil,
			Code:    uint32(codes.OK),
			Message: fmt.Sprintf("Folder created successfully: %s", createdFolder.GetFingerprint()),
		},
		Folder: folderResponse,
	}, nil
}

func (s *fileserver) Download(request *service.DownloadRequest, server service.FilesRoute_DownloadServer) error {
	util.Log("info", "Download...")
	file, err := s.filesRepository.GetOpenFile(request.GetFingerprint())

	if err != nil {
		util.Log("error", err)
		return fmt.Errorf("error open file: %v", err)
	}

	defer file.Close()

	buffer := make([]byte, 1024) 

	for {
		n, err := file.Read(buffer)

		if err == io.EOF {
			break
		}

		if err != nil {
			util.Log("error", err)
			return fmt.Errorf("error reading file: %v", err)
		}

		if err := server.Send(&service.DownloadResponse{Chunk: buffer[:n]}); err != nil {
			return fmt.Errorf("error sending chunk: %v", err)
		}
	}

	return nil
}

func (server *fileserver) GetAlbumFiles(ctx context.Context, request *service.GetAllImagesRequest) (*service.GetAllImagesResponse, error) {
	var imageFiles []*service.File
	pictures, err := server.filesRepository.GetAlbumFiles(request.GetUser())

	if err != nil {
		return  &service.GetAllImagesResponse{
			Response: &service.Response{
				Succes:  err == nil,
				Code:    uint32(codes.Canceled),
				Message: fmt.Sprintf("it is not possible to get the album. Error: %s", err),
			},
		}, err
	}

	for _, picture := range pictures {
		imageFiles = append(imageFiles, mapper.ToService(picture))
	}

	util.Log("success", "Album obtained")

	return &service.GetAllImagesResponse{
		Response: &service.Response{
			Succes:  true,
			Code:    uint32(codes.OK),
			Message: "album obtained",
		},
		Files: imageFiles,
	}, nil
}

func (server *fileserver) GetSharedFiles(ctx context.Context, request *service.GetSharedFilesRequest) (*service.GetSharedFilesResponse, error) {
	var sharedFiles []*service.File

	shared, err := server.filesRepository.GetShared(request.GetUsername(), request.GetGroups());

	if err != nil {
		return &service.GetSharedFilesResponse{
			Response: &service.Response{
				Succes:  false,
				Code:    uint32(codes.Canceled),
				Message: "Shared Files Error",
			},
		}, err
	}

	for _, file := range shared {
		serviceFile := mapper.ToService(file)
		sharedFiles = append(sharedFiles, serviceFile)
	}

	return &service.GetSharedFilesResponse{
		Response: &service.Response{
			Succes:  true,
			Code:    uint32(codes.OK),
			Message: "Shared files obtained succesfully",
		},
		Files:       sharedFiles,
		Fingerprint: "",
	}, nil
}

func (server *fileserver) ChmodFile(ctx context.Context, request *service.ChangePermissionsRequest) (*service.ChangePermissionsResponse, error) {
	err := server.filesRepository.ChangePermissions(request.GetFingerprint(), request.GetPermissions());

	if err != nil {
		return &service.ChangePermissionsResponse{
			Response: &service.Response{
				Succes:  false,
				Code:    uint32(codes.Canceled),
				Message: fmt.Sprintf("Error, chmod canceled %s", err),
			},
		}, err
	}

	util.Log("success", "File permissions successfully changed")
	return &service.ChangePermissionsResponse{
		Response: &service.Response{
			Succes:  true,
			Code:    uint32(codes.OK),
			Message: "File permissions successfully changed",
		},
	}, nil
}