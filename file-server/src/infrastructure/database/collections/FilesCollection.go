package collections

import (
	"context"
	"fmt"
	"gogrpcserver/src/domain"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type FilesCollection struct {
	Files *mongo.Collection
}

func NewFilesCollection(filesCollection *mongo.Collection) (*FilesCollection) {
	return &FilesCollection{
		Files: filesCollection,
	}
}

func (filesCollection *FilesCollection) Insert(file *domain.FileDoc) error {
	_, err := filesCollection.Files.InsertOne(context.TODO(), file)

	if err != nil {
		return fmt.Errorf("no document inserted %s", err)
	}
	return nil
}

func (filesCollection *FilesCollection) Delete(hash string) (*domain.FileDoc, error) {
	filter := bson.M{"fingerprint": hash}

	var file domain.FileDoc
	err := filesCollection.Files.FindOne(context.TODO(), filter).Decode(&file)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, fmt.Errorf("no document found with fingerprint: %s", hash)
		}
		return nil, fmt.Errorf("error when searching for the document: %v", err)
	}

	result, err := filesCollection.Files.DeleteOne(context.TODO(), filter)

	if err != nil {
		return nil, fmt.Errorf("error when deleting the document from the original collection: %v", err)
	}

	if result.DeletedCount == 0 {
		return nil, fmt.Errorf("no document found with fingerprint: %s", hash)
	}

	return &file, nil
}

func (database *FilesCollection) GetOne(attribute string, value string) (*domain.FileDoc, error) {
	filter := bson.M{attribute: value}
	var file domain.FileDoc

	err := database.Files.FindOne(context.TODO(), filter).Decode(&file)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, fmt.Errorf("no document found with %s: %s", attribute, value)
		}
		return nil, err
	}

	return &file, nil
}

func (database *FilesCollection) Update(hash string, updatedData bson.M) error {
	filter := bson.M{"fingerprint": hash}

	update := bson.M{
		"$set": updatedData,
	}

	result, err := database.Files.UpdateOne(context.TODO(), filter, update)

	if err != nil {
		return err
	}

	if result.MatchedCount == 0 {
		return fmt.Errorf("no document found with fingerprint %s", hash)
	}

	return nil
}