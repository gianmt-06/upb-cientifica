package server

import (
	"context"
	"fmt"
	"log"
	environment "syncserver/src/environment"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	env = environment.NewEnv()
)

type FileDoc struct {
	ID          primitive.ObjectID `bson:"_id,omitempty"`
	Fingerprint string             `bson:"fingerprint"`
	Path        string             `bson:"path"`
	Size        int64              `bson:"size"`
	Permissions string             `bson:"permissions"`
	Owner       string             `bson:"owner"`
	Modified    time.Time          `bson:"modified"`
	MimeType    string             `bson:"mime_type"`
}

type Database struct {
	Client            *mongo.Client
	HistoryCollection *mongo.Collection
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

	log.Println("[MongoDB]","Connection succesfully");

	return &Database{
		Client:            client,
		HistoryCollection: client.Database("server-metadata").Collection("file-history"),
	}, nil
}

func (database *Database) GetOne(attribute string, collection string, value string) (*FileDoc, error) {
	filter := bson.M{attribute: value}
	var file FileDoc
	
	// err := database.HistoryCollection.FindOne(context.TODO(), filter).Decode(&file)
	err := database.Client.Database("server-metadata").Collection(collection).FindOne(context.TODO(), filter).Decode(&file)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, fmt.Errorf("no se encontró el documento con %s: %s", attribute, value)
		}

		return nil, err
	}


	return &file, nil
}

func (database *Database) Insert(file *FileDoc) {
	_, err := database.HistoryCollection.InsertOne(context.TODO(), file)

	if err != nil {
		log.Fatal(err)
	}
}

func (database *Database) Update(path string, updatedData bson.M) error {
	filter := bson.M{"path": path}

	update := bson.M{
		"$set": updatedData,
	}

	result, err := database.HistoryCollection.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return err
	}

	if result.MatchedCount == 0 {
		return fmt.Errorf("no se encontró ningún documento con fingerprint: %s", path)
	}

	return nil
}
