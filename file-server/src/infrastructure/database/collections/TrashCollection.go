package collections

import (
	"context"
	"fmt"
	"gogrpcserver/src/domain"

	"go.mongodb.org/mongo-driver/mongo"
)

type TrashCollection struct {
	Trash *mongo.Collection
}

func NewTrashCollection(trashCollection *mongo.Collection) (*TrashCollection) {
	return &TrashCollection{
		Trash: trashCollection,
	}
}

func (trashCollection *TrashCollection) InsertMany(documents []interface{}) error {
	_, err := trashCollection.Trash.InsertMany(context.TODO(), documents)

	if err != nil {
		return fmt.Errorf("error al insertar documentos en la nueva colección: %v", err)
	}
	return nil
}

func (trashCollection *TrashCollection) MoveToTrash(file *domain.FileDoc) error {
	_, err := trashCollection.Trash.InsertOne(context.TODO(), file)

	if err != nil {
		return fmt.Errorf("no document inserted")
	}
	return nil
}
