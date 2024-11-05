package util

import (
	"log"
	"os"
)

const (
	Red   = "\033[31m"
	Blue  = "\033[34m"
	Green = "\033[32m"
	Reset = "\033[0m"
)

func Log(messageType string, data any) {
	f, err := os.OpenFile("logs/log.log", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		log.Fatalf("error opening file: %v", err)
	}
	defer f.Close()

	log.SetOutput(f)

	switch messageType {
	case "error":
		log.Println("Error:", data)
	case "warning":
		log.Println("Warning:", data)
	case "info":
		log.Println("Info:", data)
	case "success":
		log.Println("Success:", data)
	}
}


