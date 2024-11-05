package repository

import (
	"fmt"
	"gogrpcserver/src/domain"
	"gogrpcserver/src/infrastructure/database"

	"go.mongodb.org/mongo-driver/bson"
)

type MetadataRepository struct {
	database *database.Database
}

func NewMetadataRepository(database *database.Database) (*MetadataRepository) {
	return &MetadataRepository{
		database: database,
	}
}

func (repository *MetadataRepository) Insert(file *domain.FileDoc) error {
	err := repository.database.FilesCollection.Insert(file);

	if err != nil {
		fmt.Println(err)
		return err
	}
	return nil
}

func (repository *MetadataRepository) Delete(fingerprint string) error {
	deletedFile, err := repository.database.FilesCollection.Delete(fingerprint);
	
	if err != nil {
		return err
	}

	err = repository.database.TrashCollection.MoveToTrash(deletedFile);
	
	if err != nil {
		return err
	}

	return nil
}

func (repository *MetadataRepository) DeleteMany(path string) error {
	err := repository.database.DeleteMany(path)

	if err != nil {
		return err
	}

	return nil
}

func (repository *MetadataRepository) GetOne(attribute string, value string) (*domain.FileDoc, error) {
	file, err := repository.database.FilesCollection.GetOne(attribute, value);

	if err != nil {
		return nil, err
	}

	return file, nil
}

func (repository *MetadataRepository) Update(fingerprint string, updatedData bson.M) error {
	err := repository.database.FilesCollection.Update(fingerprint, updatedData);

	if err != nil {
		return err
	}

	return nil
}