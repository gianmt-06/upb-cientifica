package datamapper

import (
	"gogrpcserver/src/domain"
	"gogrpcserver/src/helper"
	service "gogrpcserver/src/infrastructure/grpcserver/services/files"
	"io/fs"
	"path/filepath"
)

type FileDatamapper struct{}

func NewDatamapper() *FileDatamapper {
	return &FileDatamapper{}
}

func (datamapper *FileDatamapper) ToDomain(fileDoc *domain.FileDoc) *domain.File {
	return domain.NewFile(
		fileDoc.Path,
		fileDoc.Fingerprint,
		fileDoc.Size,
		fileDoc.Owner,
		fileDoc.Permissions,
		fileDoc.Modified,
		fileDoc.MimeType,
	)
}

func (datamapper *FileDatamapper) ToDatabase(domainFile *domain.File) *domain.FileDoc {
	return &domain.FileDoc{
		Fingerprint: domainFile.GetFingerprint(),
		Path: domainFile.GetPath(),
		Size: domainFile.GetSize(),
		Permissions: domainFile.GetPermissions(),
		Owner: domainFile.GetOwner(),
		Modified: domainFile.GetModified(),
		MimeType: domainFile.GetMimetype(),
	}
}

func (datamapper *FileDatamapper) SystemToDomain(systemInfo *fs.FileInfo) *domain.File {
	return nil
}

func (datamapper *FileDatamapper) ToService(domainFile *domain.File) *service.File {
	return &service.File{
		FingerPrint: domainFile.GetFingerprint(),
		Name:        filepath.Base(domainFile.GetPath()),
		Size:        domainFile.GetSize(),
		Path:        domainFile.GetPath(),
		Modified:    helper.FormatTime(domainFile.GetModified()),
		Permissions: domainFile.GetPermissions(),
		Owner:       domainFile.GetOwner(),
		MimeType:    domainFile.GetMimetype(),
	}
}
