package main

import (
	"flag"
	"fmt"
	"log"
	"net"
	"syncserver/src/environment"
	"syncserver/src/server"

	"google.golang.org/grpc"
)


var (
	env = environment.NewEnv()
)

func  main()  {
	fmt.Println("This is your GO! Sync Server")

	fileServerConnection := server.NewConnection();

	flag.Parse()
	lis, err := net.Listen("tcp", env.GetServerIp()+":"+env.GetServerPort())

	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}	

	s := grpc.NewServer()

	server.Register(s, *fileServerConnection);

	log.Printf("gRPC server listening at %v", lis.Addr())

	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}