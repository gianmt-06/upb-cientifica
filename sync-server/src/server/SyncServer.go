package server

import (
	"context"
	"fmt"
	"io"
	"log"
	"os"
	"path"
	"path/filepath"
	"sort"
	"strings"
	service "syncserver/src/services"
	"syncserver/src/services/files"
	"syncserver/src/util"
	"time"
	"google.golang.org/grpc"
)

type syncserver struct {
	service.UnimplementedSyncServiceServer
	FilesConnection
	Database
	Cache 
}

type FileAction struct {
	path   string
	action string
}

func Register(server grpc.ServiceRegistrar, files FilesConnection) {
	database, err := NewDatabase()
	cache := NewCacheClient()

	if err != nil {
		log.Println(err)
		log.Fatalf("no")
	}

	syncServer := &syncserver{
		FilesConnection: files,
		Database:        *database,
		Cache: *cache,
	}
	service.RegisterSyncServiceServer(server, syncServer)
}

func (s *syncserver) Ping(ctx context.Context, in *service.PingRequest) (*service.PingReply, error) {
	return &service.PingReply{Message: "pong"}, nil
}

func addToMap(action string, elementsToSync map[string]*service.FileList, element *service.FileData) {
	if elementsList, ok := elementsToSync[action]; ok {
		elementsList.Elements = append(elementsList.Elements, element)
	} else {
		elementsToSync[action] = &service.FileList{
			Elements: []*service.FileData{element},
		}
	}
}

func getRelative(user string, path string) string {
	return "/" + user + "/" + filepath.Join(path)
}

func (s *syncserver) Upload(stream service.SyncService_UploadServer) (err error) {
	util.Log("info", "Upload init...")
	var request *service.FileUploadRequest
	
	ctx := context.Background();
	
	fileStream, err := s.FilesConnection.client.Upload(ctx)
	
	for {
		request, err = stream.Recv()
		
		if err != nil {
			util.Log("error", err)
			if err == io.EOF {
				break
			}
			break
		}
		
		err = fileStream.Send(&files.FileUploadRequest{
			FileName:          request.GetFileName(),
			FolderFingerprint: request.GetFolderFingerprint(),
			Chunk:             request.GetChunk(),
			Username:          request.GetUsername(),
		})

		if err != nil {
			util.Log("error", err)
		}
	}
	
	_, err = fileStream.CloseAndRecv()

	if err != nil {
		util.Log("error", err)
	}

	return nil
}

func (s *syncserver) Download(request *service.DownloadRequest, stream service.SyncService_DownloadServer) error {
	util.Log("info", "Downloading File...");
	ctx := context.Background();

	fileStream, err := s.FilesConnection.client.Download(ctx, &files.DownloadRequest{
		Fingerprint: request.Fingerprint,
	})

	if err != nil {
		util.Log("error", err)
		return nil
	}

	for {
		chunk, err := fileStream.Recv()

		if err != nil {
			fmt.Println("error", err)
			if err == io.EOF {
				break
			}
		}

		if err := stream.Send(&service.DownloadResponse{Chunk: chunk.Chunk}); err != nil {
			util.Log("error", err);
			return nil
		}
	}

	return nil
}

func (s *syncserver) Sync(ctx context.Context, request *service.SyncRequest) (*service.SyncResponse, error) {
	util.Log("info", "Sync... USER: " + request.GetUser())
	
	s.Cache.FlushAll(ctx) 
	s.deleteItems(request.GetToRemove(), request.GetUser()) 
	
	clientTree := request.GetClientTree()
	clientFolder := path.Join(env.GetRootDir(), request.GetUser())
	
	elementsToSync := make(map[string]*service.FileList)
	elementsToUpdate := []*service.ChecksumsList{}
	elementsToClientUpdate := []*service.ChecksumsList{}

	keys := getSortedKeys(clientTree)

	for _, key := range keys {
		clientElement := clientTree[key]
		clientElement.Path = util.CleanPath(clientElement.Path)
		s.processClientElement(ctx, request, clientElement, elementsToSync)
	}

	err := s.processServerFiles(request, clientFolder, clientTree, elementsToSync)
	if err != nil {
		util.Log("err", "No es posible realizar la sincronización")
	}

	util.Log("success", "SUCCESS Sync... USER: " + request.GetUser())
	return &service.SyncResponse{
		Elements:       elementsToSync,
		ToUpdate:       elementsToUpdate,
		ToClientUpdate: elementsToClientUpdate,
	}, nil
}

func getSortedKeys(clientTree map[string]*service.FileData) []string {
	keys := make([]string, 0, len(clientTree))
	for k := range clientTree {
		keys = append(keys, k)
	}
	sort.Strings(keys)
	return keys
}

func (s *syncserver) processClientElement(ctx context.Context, request *service.SyncRequest, clientElement *service.FileData, elementsToSync map[string]*service.FileList) {
	metadata, err := s.getMetadata(request.GetUser(), clientElement.GetPath(), "files")
	
	if err != nil {
		if s.isInTrash(request.GetUser(), clientElement.GetPath()) {
			addToMap("toClientRemove", elementsToSync, clientElement)

		} else {
			if clientElement.GetIsDir() {
				s.createFolder(ctx, request, clientElement)
			} else {
				s.syncFile(request, clientElement, elementsToSync)
			}
		}
	} else {
		s.defineUpdate(request, clientElement, metadata, elementsToSync)
	}
}

func (s *syncserver) getMetadata(user, path, collection string) (*FileDoc, error) {
	return s.Database.GetOne("path", collection, getRelative(user, path))
}

func (s *syncserver) isInTrash(user, path string) bool {
	_, err := s.getMetadata(user, path, "trash")
	return err == nil
}

func (s *syncserver) createFolder(ctx context.Context, request *service.SyncRequest, clientElement *service.FileData) {
	containingFolder := s.getContainingFolder(request, clientElement.GetPath())
	s.FilesConnection.client.CreateFolder(ctx, &files.CreateFolderRequest{
		FolderFingerprint: containingFolder,
		FolderName:        filepath.Base(clientElement.Path),
		Owner:             request.GetUser(),
	})
}

func (s *syncserver) getContainingFolder(request *service.SyncRequest, path string) string {
	inFolder := filepath.Dir(path)
	if inFolder == "." {
		inFolder = "/" + request.GetUser()
	}
	containing, err := s.getMetadata(request.GetUser(), inFolder, "files")
	if err != nil {
		homeDir, err := s.getMetadata(request.GetUser(), "/", "files")
		if err != nil {
			util.Log("error", "Home Not Found")
			return ""
		}
		return homeDir.Fingerprint
	}
	return containing.Fingerprint
}

func (s *syncserver) syncFile(request *service.SyncRequest, clientElement *service.FileData, elementsToSync map[string]*service.FileList) {
	containingFolder := s.getContainingFolder(request, clientElement.GetPath())
	clientElement.FolderFingerprint = containingFolder
	clientElement.Path = replacePathSeparator(clientElement.Path, request.GetSep())
	
	addToMap("toSendToServer", elementsToSync, clientElement)
}

func (s *syncserver) defineUpdate(request *service.SyncRequest, clientElement *service.FileData, metadata *FileDoc, elementsToSync map[string]*service.FileList) {
	modified, err := time.Parse(time.RFC3339, clientElement.GetModified())
	
	if err != nil {
		return
	}

	clientElement.Path = replacePathSeparator(clientElement.Path, request.GetSep())
	
	if modified.After(metadata.Modified) && metadata.Size != clientElement.Size && metadata.MimeType != "dir" {
		s.syncFile(request, clientElement, elementsToSync)
		addToMap("toServerUpdate", elementsToSync, clientElement)

	} else if metadata.Modified.After(modified) && metadata.Size != clientElement.Size && metadata.MimeType != "dir" {
		clientElement.Fingerprint = metadata.Fingerprint
		addToMap("toClientUpdate", elementsToSync, clientElement)

	}
}

func (s *syncserver) processServerFiles(request *service.SyncRequest, clientFolder string, clientTree map[string]*service.FileData, elementsToSync map[string]*service.FileList) error {
	return filepath.WalkDir(clientFolder, func(path string, file os.DirEntry, err error) error {
		if err != nil {
			util.Log("error", err)
			return err
		}

		relative, err := filepath.Rel(clientFolder, path)
		if err != nil {
			util.Log("error", err)
			return err
		}
		relative = replacePathSeparator(relative, request.GetSep())

		_, exists := clientTree[relative]
		metadata, err := s.getMetadata(request.GetUser(), relative, "files")

		if err == nil && clientFolder != path && !exists {
			fileData := &service.FileData{
				Path:        request.GetSep() + relative,
				Fingerprint: metadata.Fingerprint,
				Modified:    metadata.Modified.Format(time.RFC3339),
				IsDir:       file.IsDir(),
				Permissions: metadata.Permissions,
			}
			addToMap("toClientCreate", elementsToSync, fileData)
		}
		return nil
	})
}

func replacePathSeparator(path, sep string) string {
	if sep == "\\" {
		replacer := strings.NewReplacer(" ", "", "/", "\\")
		return replacer.Replace(path)
	}
	return path
}

func (s *syncserver) deleteItems(items []string, user string){
	for _, deletedElement := range items {
		deletedElement = util.CleanPath(deletedElement);

		metadata, err := s.Database.GetOne("path", "files", getRelative(user, deletedElement)) 

		if err != nil {
			util.Log("error", err);
			continue
		}

		s.FilesConnection.Delete(metadata.Fingerprint);
		util.Log("warning", deletedElement + " Deleted");
	}
}

func (s *syncserver) UploadBlocks(stream service.SyncService_UploadBlocksServer) (err error) {
	var request *service.UploadBlockRequest
	firstChunk := true
	var fullpath string

	ctx := context.Background();

	fileStream, err := s.FilesConnection.client.Upload(ctx)

	for {
		request, err = stream.Recv()

		if err != nil {
			if err == io.EOF {
				break
			}
			return
		}

		if firstChunk {
			fullpath = path.Join(env.GetRootDir(), request.GetPath())
		}

		fmt.Println(int64(request.GetBlock().GetNumber()))
		
		if !request.GetBlock().GetReference() {
			util.ReplaceBytesInFile(fullpath, 1024, int64(request.GetBlock().GetNumber()), request.GetBlock().GetPayload())
		}
	}

	_, err = fileStream.CloseAndRecv()
	if err != nil {
		log.Fatalf("Error closing stream to target server: %v", err)
	}

	return nil
}

func (s *syncserver) DownloadBlocks(request *service.DownloadBlockRequest, stream service.SyncService_DownloadBlocksServer) error {
	fileToSend := path.Join(env.GetRootDir(), request.GetUser(), request.GetPath())

	var chunker *util.FileChunker
	chunker, _ = util.NewFileChunker(fileToSend, int64(request.GetBlockSize()))
	var chunk []byte

	for i := 0; i < int(request.GetNumber()); i++ {
		obtained, hasMore, err := chunker.Next()

		if err != nil {
			fmt.Println("err", err)
			return nil
		}
		
		if len(obtained) == 0 {
			break
		}

		chunk = obtained;
		if !hasMore {
			break
		}
	}

	stream.Send(&service.DownloadBlockResponse{
		Block: &service.Block{
			Reference: false,
			Number: uint32(request.GetNumber()),
			Payload: chunk,
		},
	})

	return nil
}