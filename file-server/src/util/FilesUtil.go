package util

import (
	"os"
	"path/filepath"
	"strings"
)

func CleanName(name string) string {
	if name == "" {
		return ""
	}
	replacer := strings.NewReplacer(" ", "", "/", "")
	return replacer.Replace(name)
}

func CheckPathExists(filePath string) (bool, error) {
	_, err := os.Stat(filePath)
	if err != nil && os.IsNotExist(err) {
		return false, nil
	}
	return err == nil, err
}

func IsImage(fileName string) bool {
	extensions := []string{".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff", ".webp"}
	for _, ext := range extensions {
		if strings.EqualFold(filepath.Ext(fileName), ext) {
			return true
		}
	}
	return false
}

func GetFolderSize(fullpath string) int64 {
	var size int64

	err := filepath.Walk(fullpath, func(_ string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if !info.IsDir() {
			size += info.Size()
		}
		return err
	})

	if err != nil {
		return -1
	}

	return size
}