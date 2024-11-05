package database

import (
	"context"
	"fmt"
	"gogrpcserver/src/environment"
	"gogrpcserver/src/infrastructure/database/collections"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	env = environment.NewEnv()
)

type Database struct {
	Client          *mongo.Client
	FilesCollection *collections.FilesCollection
	TrashCollection *collections.TrashCollection
}

func NewDatabase() (*Database, error) {
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI(env.GetDatabaseUri()).SetServerAPIOptions(serverAPI)

	client, err := mongo.Connect(context.TODO(), opts)
	
	if err != nil {
		return nil, err
	}

	err = client.Ping(context.TODO(), nil)
	
	if err != nil {
		return nil, err
	}

	filesCollection :=  client.Database("server-metadata").Collection("files")
	trashCollection := client.Database("server-metadata").Collection("trash")

	return &Database{
		Client:          client,
		FilesCollection: collections.NewFilesCollection(filesCollection),
		TrashCollection: collections.NewTrashCollection(trashCollection),
	}, nil
}

func (database *Database) DeleteMany(path string) error {
	filter := bson.M{"path": bson.M{"$regex": fmt.Sprintf("^%s", path)}}

	cursor, err := database.FilesCollection.Files.Find(context.TODO(), filter);

	if err != nil {
		return fmt.Errorf("error al buscar documentos con path: %s, error: %v", path, err)
	}

	defer cursor.Close(context.TODO())

	var documents []interface{}
	
	for cursor.Next(context.TODO()) {
		var document bson.M

		if err := cursor.Decode(&document); err != nil {
			return fmt.Errorf("error al decodificar un documento: %v", err)
		}

		documents = append(documents, document)
	}

	if len(documents) == 0 {
		return fmt.Errorf("no se encontró ningún documento con path: %s", path)
	}

	err = database.TrashCollection.InsertMany(documents)

	if err != nil {
		return fmt.Errorf("error al insertar documentos en la nueva colección: %v", err)
	}

	result, err := database.FilesCollection.Files.DeleteMany(context.TODO(), filter)

	if err != nil {
		return fmt.Errorf("error al eliminar los documentos de la colección original: %v", err)
	}

	if result.DeletedCount == 0 {
		return fmt.Errorf("no se encontró ningún documento para eliminar con path: %s", path)
	}

	return nil
}