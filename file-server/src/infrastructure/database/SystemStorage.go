package database

import (
	"fmt"
	"gogrpcserver/src/helper"
	"io/fs"
	"os"
)

// var (
// 	env = environment.NewEnv()
// )

type StorageInterface interface {
	ChangePermissions()
	Write()
	Download()
	Delete()
}

type Storage struct {
}

func NewStorage() (*Storage) {
	return &Storage{}
}

func (storage *Storage) Write(file *os.File, data []byte) error {
	index := 0
	sliceSize := len(data)

	for {
		writtenBytes, err := file.Write(data[index:])

		if err != nil {
			return err
		}

		index += writtenBytes

		if writtenBytes >= sliceSize {
			return nil
		}
	}
}

func (storage *Storage) Save() *os.File {
	return nil
}

func (storage *Storage) CreateFolder(relative string) (fs.FileInfo, error) {
	fullpath := helper.GetSystemPath(relative);
	err := os.Mkdir(fullpath, 0700);

	if err != nil {
		return nil, err
	}

	created, err := os.Stat(fullpath);

	if err != nil {
		return nil, err
	}
	
	return created, nil
}

func (storage *Storage) GetOne(relative string) (*fs.FileInfo, error){
	fullpath := helper.GetSystemPath(relative);
	info, err := os.Stat(fullpath)

	if err != nil {
		return nil, fmt.Errorf("error %s", err)
	}

	return &info, nil
}

func (storage *Storage) OpenFile(relative string) (*os.File, error){
	fullpath := helper.GetSystemPath(relative);
	file, err := os.Open(fullpath)
	
	if err != nil {
		return nil, fmt.Errorf("error %s", err)
	}

	return file, nil
}

func (storage *Storage) GetAll(relative string) ([]fs.DirEntry, error){
	fullpath := helper.GetSystemPath(relative);

	files, err := os.ReadDir(fullpath);

	if err != nil {
		return nil, fmt.Errorf("error %s", err)
	}

	return files, nil
}

func (storage *Storage) Exists(relative string) bool {
	_, err := storage.GetOne(relative)
	return err == nil
}

func (storage *Storage) Delete(relative string) error {
	fullpath := helper.GetSystemPath(relative);
	err := os.RemoveAll(fullpath)

	if err != nil {
		return err
	}

	return nil
}

func (storage *Storage) Chmod(relative string, permissions fs.FileMode) error {

	fullpath := helper.GetSystemPath(relative);
	err := os.Chmod(fullpath, permissions);

	if err != nil {
		return fmt.Errorf("Chmod failed")
	}
	return nil
}