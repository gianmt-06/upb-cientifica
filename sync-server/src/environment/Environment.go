package environment

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Env struct {
	fileServer string
	filePortServer string
	serverIp string
	serverPort string
	rootDir string
	databaseUri string
	cacheUri string
}

func NewEnv() *Env {
	err := godotenv.Load("env/.development.env")
    
    if err != nil {
        log.Fatal("Error loading .env file")
    }

	return &Env{
		fileServer: os.Getenv("FILE_RPC_SERVER_IP"),
		serverIp: os.Getenv("SERVER_IP"),
		serverPort: os.Getenv("SERVER_PORT"),
		filePortServer: os.Getenv("FILE_RPC_SERVER_PORT"),
		rootDir: os.Getenv("ROOT_DIR_ENV"),
		databaseUri: os.Getenv("DATABASE_URI"),
		cacheUri: os.Getenv("CACHE_URI"),
	}
}

func (environment *Env) GetRootDir() string {
	return environment.rootDir
}

func (environment *Env) GetFileServerIP() string {
	return environment.fileServer
}

func (environment *Env) GetFileServerPort() string {
	return environment.filePortServer
}

func (environment *Env) GetDatabaseUri() string {
	return environment.databaseUri
}

func (environment *Env) GetCacheUri() string {
	return environment.cacheUri
}

func (environment *Env) GetServerIp() string {
	return environment.serverIp
}

func (environment *Env) GetServerPort() string {
	return environment.serverPort
}