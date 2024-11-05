package domain

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
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