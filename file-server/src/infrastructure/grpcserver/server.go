package grpcserver

import (
	"flag"
	"gogrpcserver/src/environment"
	"gogrpcserver/src/infrastructure/database"
	filesService "gogrpcserver/src/infrastructure/grpcserver/controllers/files"
	metadataRepo "gogrpcserver/src/infrastructure/repository/metadata"
	filesRepo "gogrpcserver/src/infrastructure/repository/files"
	"gogrpcserver/src/util"
	"log"
	"net"

	"google.golang.org/grpc"
)

var (
	env = environment.NewEnv()
)

func Listen() {
	flag.Parse()
	uri := env.GetServerIp() + ":" + env.GetServerPort()

	lis, err := net.Listen("tcp", uri)

	if err != nil {
		util.Log("err", "Failed to listen "+uri)
		log.Fatalf("Failed to listen: %v", err)
	}

	mongoDb, err := database.NewDatabase();
	storage := database.NewStorage()

	if err != nil {
		util.Log("err", "Database connection failed")
		log.Fatalf("Database connection failed: %v", err)
	} else {
		log.Printf("Database Connection Succesfully")
	}

	metadataRepository := metadataRepo.NewMetadataRepository(mongoDb);
	filesRepository := filesRepo.NewFilesRepository(storage, metadataRepository)

	service := grpc.NewServer()

	filesService.NewServer(service, filesRepository, metadataRepository)

	log.Printf("gRPC server listening at %v", lis.Addr())

	if err := service.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
