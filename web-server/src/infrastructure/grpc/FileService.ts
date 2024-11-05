// import protoLoader from "@grpc/proto-loader";
import * as grpc from '@grpc/grpc-js';
// import path from "path";
import { ChangePermissionsRequest, CreateFolderRequest, CreateFolderResponse, DeleteFileRequest, DeleteFileResponse, File, FileUploadRequest, FileUploadResponse, GetAllFilesRequest, GetAllFilesResponse, GetAllImagesRequest, GetAllImagesResponse, GetCustomFilesRequest, GetCustomFilesResponse, GetFileRequest, GetHomeSizeRequest, GetHomeSizeResponse, GetSharedFilesRequest, GetSharedFilesResponse, PingRequest, RenameFileRequest, RenameFileResponse } from "../../contracts/grpc/fileserver_pb";
import { FilesRouteClient } from "../../contracts/grpc/fileserver_grpc_pb";
import { GRPCResponse } from '../../util/GRPCResponseManager';
import { Environment } from '../../environment/Environment';

export class GrpcFileService {
    private readonly client: FilesRouteClient;
    private readonly env: Environment;

    constructor() {
        this.env = new Environment;
        this.client = new FilesRouteClient(this.env.GRPC_URI, grpc.credentials.createInsecure())
        this.ping()
    }

    public ping = () => {
        const req = new PingRequest();
        this.client.ping(req, (err, response) => {
            if (!err) {
                console.log("[FILES]", response.getMessage());
            } else {
                console.log(err);
            }
        })
    }

    public getFolderFiles = async (folderFingerprint: string): Promise<GRPCResponse<{ files: File[], path: string }>> => {
        const request = new GetAllFilesRequest();

        request.setFolderfingerprint(folderFingerprint);

        const getFilesPromise = new Promise<GetAllFilesResponse>((resolve, reject) => {
            this.client.getFolderFiles(request, (err, response) => {
                !err ? resolve(response) : reject(err)
            })
        })

        const response = await getFilesPromise;

        return {
            success: response.getResponse()?.getSucces() || false,
            message: response.getResponse()?.getMessage() || '',
            data: {
                files: response.getFilesList(),
                path: response.getFolderpath()
            }
        }
    }

    public getCustom = async (user: string, folder: string): Promise<GRPCResponse<{ files: File[], fingerprint: string }>> => {
        const request = new GetCustomFilesRequest();

        request.setUser(user);
        request.setFolder(folder)

        const getFilesPromise = new Promise<GetCustomFilesResponse>((resolve, reject) => {
            this.client.getCustomFiles(request, (err, response) => {                
                !err ? resolve(response) : reject(err)
            })
        })

        const response = await getFilesPromise;

        return {
            success: response.getResponse()?.getSucces() || false,
            message: response.getResponse()?.getMessage() || '',
            data: { files: response.getFilesList(), fingerprint: response.getFingerprint() }
        }
    }

    public getShared = async (user: string, groups: string[]): Promise<GRPCResponse<{ files: File[], fingerprint: string }>> => {
        const request = new GetSharedFilesRequest();

        request.setUsername(user);
        request.setGroupsList(groups);

        const getFilesPromise = new Promise<GetSharedFilesResponse>((resolve, reject) => {
            this.client.getSharedFiles(request, (err, response) => {                
                !err ? resolve(response) : reject(err)
            })
        })

        const response = await getFilesPromise;

        return {
            success: response.getResponse()?.getSucces() || false,
            message: response.getResponse()?.getMessage() || '',
            data: { files: response.getFilesList(), fingerprint: response.getFingerprint() }
        }
    }


    public createFolder = async (folderFingerprint: string, folderName: string, username: string): Promise<GRPCResponse<File>> => {
        const request = new CreateFolderRequest();

        request.setFolderfingerprint(folderFingerprint);
        request.setFoldername(folderName);
        request.setOwner(username)

        const getFilesPromise = new Promise<CreateFolderResponse>((resolve, reject) => {
            this.client.createFolder(request, (err, response) => {
                !err ? resolve(response) : reject(err)
            })
        })

        const response = await getFilesPromise;

        return {
            success: response.getResponse()?.getSucces() || false,
            message: response.getResponse()?.getMessage() || '',
            data: response.getFolder()
        }
    }

    public getProperties = (fileFingerprint: string) => {
        const request = new GetFileRequest();
        request.setFingerprint(fileFingerprint);

        this.client.getProperties(request, (err, response) => {
            if (!err) {
                console.log(response);
            } else {
                console.log(err);
            }
        })
    }

    public deleteFile = async (fileFingerprint: string): Promise<GRPCResponse<void>> => {
        const request = new DeleteFileRequest();

        request.setFingerprint(fileFingerprint);

        const getFilesPromise = new Promise<DeleteFileResponse>((resolve, reject) => {
            this.client.deleteFile(request, (err, response) => {
                !err ? resolve(response) : reject(err);
            })
        })

        const response = await getFilesPromise;

        return {
            success: response.getResponse()?.getSucces() || false,
            message: response.getResponse()?.getMessage() || ''
        }
    }

    public getHomeSize = async (user: string): Promise<GRPCResponse<number>> => {
        const request = new GetHomeSizeRequest();

        request.setUser(user)

        const getStorageSize = new Promise<GetHomeSizeResponse>((resolve, reject) => {
            this.client.getHomeSize(request, (err, response) => {
                !err ? resolve(response) : reject(err);
            })
        })

        const response = await getStorageSize;

        return {
            success: response.getSize() != 1 ? true : false, 
            message: "",
            data: response.getSize(),
        }
    }

    public renameFile = async (fileFingerprint: string, newName: string): Promise<GRPCResponse<void>> => {
        const request = new RenameFileRequest();

        request.setFingerprint(fileFingerprint);
        request.setNewname(newName);

        const getFilesPromise = new Promise<RenameFileResponse>((resolve, reject) => {
            this.client.renameFile(request, (err, response) => {
                !err ? resolve(response) : reject(err);
            })
        })

        const response = await getFilesPromise;
        return {
            success: response.getResponse()?.getSucces() || false,
            message: response.getResponse()?.getMessage() || ''
        }
    }

    public upload = (buffer: Buffer, folderFingerprint: string, fileName: string, username: string): Promise<FileUploadResponse> => {
        return new Promise<FileUploadResponse>((resolve, reject) => {
            try {
                const call = this.client.upload((error, response) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(response);
                });

                const chunkSize = 1 * 1024 * 1024;
                let offset = 0;

                while (offset < buffer.length) {
                    const end = Math.min(offset + chunkSize, buffer.length);
                    const chunk = new Uint8Array(buffer).slice(offset, end);
                                        
                    const request = new FileUploadRequest();
                    request.setFilename(fileName);
                    request.setFolderfingerprint(folderFingerprint);
                    request.setChunk(chunk);
                    request.setUsername(username)

                    call.write(request);
                    offset = end;
                }

                call.end();
            } catch (error) {
                console.error('Error during gRPC upload:', error);
                reject(error);
            }
        });
    }

    public getClient = () => {
        return this.client
    }


    public getAlbum = async (user: string): Promise<GRPCResponse<File[]>> => {
        const request = new GetAllImagesRequest();

        request.setUser(user);

        const getFilesPromise = new Promise<GetAllImagesResponse>((resolve, reject) => {
            this.client.getAlbumFiles(request, (err, response) => {
                !err ? resolve(response) : reject(err);
            })
        })

        const response = await getFilesPromise;

        return {
            success: response.getResponse()?.getSucces() || false,
            message: response.getResponse()?.getMessage() || '',
            data: response.getFilesList()
        }
    }

    public changePermissions = async (fingerprint: string, permissions: string): Promise<GRPCResponse<void>> => {
        const request = new ChangePermissionsRequest();

        request.setFingerprint(fingerprint);
        request.setPermissions(permissions);

        const chmodResponse = new Promise<RenameFileResponse>((resolve, reject) => {
            this.client.chmodFile(request, (err, response) => {
                !err ? resolve(response) : reject(err);
            })
        })

        const response = await chmodResponse;        

        return {
            success: response.getResponse()?.getSucces() || false,
            message: response.getResponse()?.getMessage() || ''
        }
    }

}