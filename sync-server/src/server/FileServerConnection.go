package server

import (
	"context"
	"flag"
	"log"
	service "syncserver/src/services/files"
	"time"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

type FilesConnection struct{
	client service.FilesRouteClient
	conn   *grpc.ClientConn
}

func (connection *FilesConnection) CloseConnection() {
	if connection.conn != nil {
		connection.conn.Close()
	}
}

func NewConnection() *FilesConnection {
	flag.Parse()
	
	connection, err := grpc.NewClient(env.GetFileServerIP()+":"+env.GetFileServerPort(), grpc.WithTransportCredentials(insecure.NewCredentials()))

	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}	
	
	client := service.NewFilesRouteClient(connection);

	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	
	r, err := client.Ping(ctx, &service.PingRequest{});

	if err != nil {
		log.Fatalf("Could not connect: %v", err)
	}

	log.Println("[FileServer]", "Ping:", r.GetMessage())

	return &FilesConnection{
		client: client,
		conn: connection,
	}
}

func (connection *FilesConnection) Ping(){
	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()

	response, _ := connection.client.Ping(ctx, &service.PingRequest{});

	log.Println("[FileServer]", "Ping:", response.GetMessage())
}

func (connection *FilesConnection) Delete(fingerprint string){
	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()

	connection.client.DeleteFile(ctx, &service.DeleteFileRequest{
		Fingerprint: fingerprint,
	});
}

