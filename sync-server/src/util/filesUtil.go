package util

import (
	"errors"
	"fmt"
	"io"
	"os"
	"strings"
)

type FileChunker struct {
	path string
	size int64
	file *os.File
}

func NewFileChunker(path string, size int64) (*FileChunker, error)	{
	if size <= 0 {
		fmt.Println("No size, no blocks")
		return nil, nil
	}
	file, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	// defer file.Close();

	return &FileChunker{
		path: path,
		size: size,
		file: file,
	}, nil
}

func (c *FileChunker) Next() ([]byte, bool, error) {
	buf := make([]byte, c.size)
	n, err := io.ReadFull(c.file, buf)
	if err != nil {
		if err == io.ErrUnexpectedEOF || err == io.EOF {
			return buf[:n], false, nil
		}
		return nil, false, err
	}
	return buf[:], true, nil
}

func (c *FileChunker) Close() error {
	return c.file.Close()
}

type FileIterator struct {
	path   string
	size   int64
	file   *os.File
	offset int64
}

func NewFileIterator(path string, size int64) (*FileIterator, error) {
	if size <= 0 {
		return nil, errors.New("malformed block size")
	}
	file, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	return &FileIterator{
		path: path,
		size: size,
		file: file,
	}, nil
}

func (c *FileIterator) Close() error {
	return c.file.Close()
}

func (c *FileIterator) Next() ([]byte, error) {
	c.file.Seek(c.offset, 0)
	buf := make([]byte, c.size)
	n, err := io.ReadFull(c.file, buf)
	if err != nil {
		if err == io.ErrUnexpectedEOF || err == io.EOF {
			return buf[:n], nil
		}
		return nil, err
	}
	return buf[:], nil
}

func (c *FileIterator) IncOffset(inc int64) {
	c.offset += inc
}

func ReplaceBytesInFile(filePath string, blockSize int64, blockId int64,  newData []byte) error {
	file, err := os.OpenFile(filePath, os.O_RDWR, 0644)
	if err != nil {
		return fmt.Errorf("error abriendo el archivo: %v", err)
	}
	defer file.Close()

	_, err = file.Seek(blockId * blockSize, 0)

	if err != nil {
		return fmt.Errorf("error moviendo el puntero a la posición %d: %v", blockId * blockSize, err)
	}

	_, err = file.Write(newData)
	if err != nil {
		return fmt.Errorf("error escribiendo nuevos datos: %v", err)
	}

	//Mirar si se se ha borrado algo
	_, err = file.Seek(blockId + 1 * blockSize, 0)

	if err != nil {
		newData = make([]byte, blockSize)
		_, err = file.Write(newData)
	}

	return nil
}

func CleanPath(path string) string {
	if path == "" {
		return ""
	}

	replacer := strings.NewReplacer(" ", "", "\\", "/")	

	path = replacer.Replace(path)

	return path
}