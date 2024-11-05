package environment

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Env struct {
	rootDir string
	ipServer string
	portServer string
	databaseUri string
}

func NewEnv() *Env {
	err := godotenv.Load("env/.development.env")
    
    if err != nil {
        log.Fatal("Error loading .env file")
    }

	return &Env{
		rootDir: os.Getenv("ROOT_DIR_ENV"),
		ipServer: os.Getenv("IP_RPC_SERVER"),
		portServer: os.Getenv("PORT_RPC_SERVER"),
		databaseUri: os.Getenv("DATABASE_URI"),
	}
}

func (environment *Env) GetRootDir() string {
	return environment.rootDir
}

func (environment *Env) GetServerIp() string {
	return environment.ipServer
}

func (environment *Env) GetServerPort() string {
	return environment.portServer
}

func (environment *Env) GetDatabaseUri() string {
	return environment.databaseUri
}