package main

import (
	"fmt"
	server "gogrpcserver/src/infrastructure/grpcserver"
)

func main() {
    fmt.Println("This is your GO! gRPC server");
	server.Listen()
}