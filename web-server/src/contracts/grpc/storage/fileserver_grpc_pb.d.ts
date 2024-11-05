// package: pb
// file: fileserver.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as fileserver_pb from "./fileserver_pb";

interface IFilesRouteService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    ping: IFilesRouteService_IPing;
    createFolder: IFilesRouteService_ICreateFolder;
    getProperties: IFilesRouteService_IGetProperties;
    deleteFile: IFilesRouteService_IDeleteFile;
    renameFile: IFilesRouteService_IRenameFile;
    getFolderFiles: IFilesRouteService_IGetFolderFiles;
    getSharedFiles: IFilesRouteService_IGetSharedFiles;
    getCustomFiles: IFilesRouteService_IGetCustomFiles;
    getHomeSize: IFilesRouteService_IGetHomeSize;
    getAlbumFiles: IFilesRouteService_IGetAlbumFiles;
    getStreamingFiles: IFilesRouteService_IGetStreamingFiles;
    upload: IFilesRouteService_IUpload;
    download: IFilesRouteService_IDownload;
    chmodFile: IFilesRouteService_IChmodFile;
    moveFile: IFilesRouteService_IMoveFile;
}

interface IFilesRouteService_IPing extends grpc.MethodDefinition<fileserver_pb.PingRequest, fileserver_pb.PingReply> {
    path: "/pb.FilesRoute/Ping";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<fileserver_pb.PingRequest>;
    requestDeserialize: grpc.deserialize<fileserver_pb.PingRequest>;
    responseSerialize: grpc.serialize<fileserver_pb.PingReply>;
    responseDeserialize: grpc.deserialize<fileserver_pb.PingReply>;
}
interface IFilesRouteService_ICreateFolder extends grpc.MethodDefinition<fileserver_pb.CreateFolderRequest, fileserver_pb.CreateFolderResponse> {
    path: "/pb.FilesRoute/CreateFolder";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<fileserver_pb.CreateFolderRequest>;
    requestDeserialize: grpc.deserialize<fileserver_pb.CreateFolderRequest>;
    responseSerialize: grpc.serialize<fileserver_pb.CreateFolderResponse>;
    responseDeserialize: grpc.deserialize<fileserver_pb.CreateFolderResponse>;
}
interface IFilesRouteService_IGetProperties extends grpc.MethodDefinition<fileserver_pb.GetFileRequest, fileserver_pb.GetFileResponse> {
    path: "/pb.FilesRoute/GetProperties";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<fileserver_pb.GetFileRequest>;
    requestDeserialize: grpc.deserialize<fileserver_pb.GetFileRequest>;
    responseSerialize: grpc.serialize<fileserver_pb.GetFileResponse>;
    responseDeserialize: grpc.deserialize<fileserver_pb.GetFileResponse>;
}
interface IFilesRouteService_IDeleteFile extends grpc.MethodDefinition<fileserver_pb.DeleteFileRequest, fileserver_pb.DeleteFileResponse> {
    path: "/pb.FilesRoute/DeleteFile";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<fileserver_pb.DeleteFileRequest>;
    requestDeserialize: grpc.deserialize<fileserver_pb.DeleteFileRequest>;
    responseSerialize: grpc.serialize<fileserver_pb.DeleteFileResponse>;
    responseDeserialize: grpc.deserialize<fileserver_pb.DeleteFileResponse>;
}
interface IFilesRouteService_IRenameFile extends grpc.MethodDefinition<fileserver_pb.RenameFileRequest, fileserver_pb.RenameFileResponse> {
    path: "/pb.FilesRoute/RenameFile";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<fileserver_pb.RenameFileRequest>;
    requestDeserialize: grpc.deserialize<fileserver_pb.RenameFileRequest>;
    responseSerialize: grpc.serialize<fileserver_pb.RenameFileResponse>;
    responseDeserialize: grpc.deserialize<fileserver_pb.RenameFileResponse>;
}
interface IFilesRouteService_IGetFolderFiles extends grpc.MethodDefinition<fileserver_pb.GetAllFilesRequest, fileserver_pb.GetAllFilesResponse> {
    path: "/pb.FilesRoute/GetFolderFiles";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<fileserver_pb.GetAllFilesRequest>;
    requestDeserialize: grpc.deserialize<fileserver_pb.GetAllFilesRequest>;
    responseSerialize: grpc.serialize<fileserver_pb.GetAllFilesResponse>;
    responseDeserialize: grpc.deserialize<fileserver_pb.GetAllFilesResponse>;
}
interface IFilesRouteService_IGetSharedFiles extends grpc.MethodDefinition<fileserver_pb.GetSharedFilesRequest, fileserver_pb.GetSharedFilesResponse> {
    path: "/pb.FilesRoute/GetSharedFiles";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<fileserver_pb.GetSharedFilesRequest>;
    requestDeserialize: grpc.deserialize<fileserver_pb.GetSharedFilesRequest>;
    responseSerialize: grpc.serialize<fileserver_pb.GetSharedFilesResponse>;
    responseDeserialize: grpc.deserialize<fileserver_pb.GetSharedFilesResponse>;
}
interface IFilesRouteService_IGetCustomFiles extends grpc.MethodDefinition<fileserver_pb.GetCustomFilesRequest, fileserver_pb.GetCustomFilesResponse> {
    path: "/pb.FilesRoute/GetCustomFiles";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<fileserver_pb.GetCustomFilesRequest>;
    requestDeserialize: grpc.deserialize<fileserver_pb.GetCustomFilesRequest>;
    responseSerialize: grpc.serialize<fileserver_pb.GetCustomFilesResponse>;
    responseDeserialize: grpc.deserialize<fileserver_pb.GetCustomFilesResponse>;
}
interface IFilesRouteService_IGetHomeSize extends grpc.MethodDefinition<fileserver_pb.GetHomeSizeRequest, fileserver_pb.GetHomeSizeResponse> {
    path: "/pb.FilesRoute/GetHomeSize";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<fileserver_pb.GetHomeSizeRequest>;
    requestDeserialize: grpc.deserialize<fileserver_pb.GetHomeSizeRequest>;
    responseSerialize: grpc.serialize<fileserver_pb.GetHomeSizeResponse>;
    responseDeserialize: grpc.deserialize<fileserver_pb.GetHomeSizeResponse>;
}
interface IFilesRouteService_IGetAlbumFiles extends grpc.MethodDefinition<fileserver_pb.GetAllImagesRequest, fileserver_pb.GetAllImagesResponse> {
    path: "/pb.FilesRoute/GetAlbumFiles";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<fileserver_pb.GetAllImagesRequest>;
    requestDeserialize: grpc.deserialize<fileserver_pb.GetAllImagesRequest>;
    responseSerialize: grpc.serialize<fileserver_pb.GetAllImagesResponse>;
    responseDeserialize: grpc.deserialize<fileserver_pb.GetAllImagesResponse>;
}
interface IFilesRouteService_IGetStreamingFiles extends grpc.MethodDefinition<fileserver_pb.GetAllImagesRequest, fileserver_pb.GetAllImagesResponse> {
    path: "/pb.FilesRoute/GetStreamingFiles";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<fileserver_pb.GetAllImagesRequest>;
    requestDeserialize: grpc.deserialize<fileserver_pb.GetAllImagesRequest>;
    responseSerialize: grpc.serialize<fileserver_pb.GetAllImagesResponse>;
    responseDeserialize: grpc.deserialize<fileserver_pb.GetAllImagesResponse>;
}
interface IFilesRouteService_IUpload extends grpc.MethodDefinition<fileserver_pb.FileUploadRequest, fileserver_pb.FileUploadResponse> {
    path: "/pb.FilesRoute/Upload";
    requestStream: true;
    responseStream: false;
    requestSerialize: grpc.serialize<fileserver_pb.FileUploadRequest>;
    requestDeserialize: grpc.deserialize<fileserver_pb.FileUploadRequest>;
    responseSerialize: grpc.serialize<fileserver_pb.FileUploadResponse>;
    responseDeserialize: grpc.deserialize<fileserver_pb.FileUploadResponse>;
}
interface IFilesRouteService_IDownload extends grpc.MethodDefinition<fileserver_pb.DownloadRequest, fileserver_pb.DownloadResponse> {
    path: "/pb.FilesRoute/Download";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<fileserver_pb.DownloadRequest>;
    requestDeserialize: grpc.deserialize<fileserver_pb.DownloadRequest>;
    responseSerialize: grpc.serialize<fileserver_pb.DownloadResponse>;
    responseDeserialize: grpc.deserialize<fileserver_pb.DownloadResponse>;
}
interface IFilesRouteService_IChmodFile extends grpc.MethodDefinition<fileserver_pb.ChangePermissionsRequest, fileserver_pb.ChangePermissionsResponse> {
    path: "/pb.FilesRoute/ChmodFile";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<fileserver_pb.ChangePermissionsRequest>;
    requestDeserialize: grpc.deserialize<fileserver_pb.ChangePermissionsRequest>;
    responseSerialize: grpc.serialize<fileserver_pb.ChangePermissionsResponse>;
    responseDeserialize: grpc.deserialize<fileserver_pb.ChangePermissionsResponse>;
}
interface IFilesRouteService_IMoveFile extends grpc.MethodDefinition<fileserver_pb.MoveFileRequest, fileserver_pb.MoveFileResponse> {
    path: "/pb.FilesRoute/MoveFile";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<fileserver_pb.MoveFileRequest>;
    requestDeserialize: grpc.deserialize<fileserver_pb.MoveFileRequest>;
    responseSerialize: grpc.serialize<fileserver_pb.MoveFileResponse>;
    responseDeserialize: grpc.deserialize<fileserver_pb.MoveFileResponse>;
}

export const FilesRouteService: IFilesRouteService;

export interface IFilesRouteServer {
    ping: grpc.handleUnaryCall<fileserver_pb.PingRequest, fileserver_pb.PingReply>;
    createFolder: grpc.handleUnaryCall<fileserver_pb.CreateFolderRequest, fileserver_pb.CreateFolderResponse>;
    getProperties: grpc.handleUnaryCall<fileserver_pb.GetFileRequest, fileserver_pb.GetFileResponse>;
    deleteFile: grpc.handleUnaryCall<fileserver_pb.DeleteFileRequest, fileserver_pb.DeleteFileResponse>;
    renameFile: grpc.handleUnaryCall<fileserver_pb.RenameFileRequest, fileserver_pb.RenameFileResponse>;
    getFolderFiles: grpc.handleUnaryCall<fileserver_pb.GetAllFilesRequest, fileserver_pb.GetAllFilesResponse>;
    getSharedFiles: grpc.handleUnaryCall<fileserver_pb.GetSharedFilesRequest, fileserver_pb.GetSharedFilesResponse>;
    getCustomFiles: grpc.handleUnaryCall<fileserver_pb.GetCustomFilesRequest, fileserver_pb.GetCustomFilesResponse>;
    getHomeSize: grpc.handleUnaryCall<fileserver_pb.GetHomeSizeRequest, fileserver_pb.GetHomeSizeResponse>;
    getAlbumFiles: grpc.handleUnaryCall<fileserver_pb.GetAllImagesRequest, fileserver_pb.GetAllImagesResponse>;
    getStreamingFiles: grpc.handleUnaryCall<fileserver_pb.GetAllImagesRequest, fileserver_pb.GetAllImagesResponse>;
    upload: grpc.handleClientStreamingCall<fileserver_pb.FileUploadRequest, fileserver_pb.FileUploadResponse>;
    download: grpc.handleServerStreamingCall<fileserver_pb.DownloadRequest, fileserver_pb.DownloadResponse>;
    chmodFile: grpc.handleUnaryCall<fileserver_pb.ChangePermissionsRequest, fileserver_pb.ChangePermissionsResponse>;
    moveFile: grpc.handleUnaryCall<fileserver_pb.MoveFileRequest, fileserver_pb.MoveFileResponse>;
}

export interface IFilesRouteClient {
    ping(request: fileserver_pb.PingRequest, callback: (error: grpc.ServiceError | null, response: fileserver_pb.PingReply) => void): grpc.ClientUnaryCall;
    ping(request: fileserver_pb.PingRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileserver_pb.PingReply) => void): grpc.ClientUnaryCall;
    ping(request: fileserver_pb.PingRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileserver_pb.PingReply) => void): grpc.ClientUnaryCall;
    createFolder(request: fileserver_pb.CreateFolderRequest, callback: (error: grpc.ServiceError | null, response: fileserver_pb.CreateFolderResponse) => void): grpc.ClientUnaryCall;
    createFolder(request: fileserver_pb.CreateFolderRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileserver_pb.CreateFolderResponse) => void): grpc.ClientUnaryCall;
    createFolder(request: fileserver_pb.CreateFolderRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileserver_pb.CreateFolderResponse) => void): grpc.ClientUnaryCall;
    getProperties(request: fileserver_pb.GetFileRequest, callback: (error: grpc.ServiceError | null, response: fileserver_pb.GetFileResponse) => void): grpc.ClientUnaryCall;
    getProperties(request: fileserver_pb.GetFileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileserver_pb.GetFileResponse) => void): grpc.ClientUnaryCall;
    getProperties(request: fileserver_pb.GetFileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileserver_pb.GetFileResponse) => void): grpc.ClientUnaryCall;
    deleteFile(request: fileserver_pb.DeleteFileRequest, callback: (error: grpc.ServiceError | null, response: fileserver_pb.DeleteFileResponse) => void): grpc.ClientUnaryCall;
    deleteFile(request: fileserver_pb.DeleteFileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileserver_pb.DeleteFileResponse) => void): grpc.ClientUnaryCall;
    deleteFile(request: fileserver_pb.DeleteFileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileserver_pb.DeleteFileResponse) => void): grpc.ClientUnaryCall;
    renameFile(request: fileserver_pb.RenameFileRequest, callback: (error: grpc.ServiceError | null, response: fileserver_pb.RenameFileResponse) => void): grpc.ClientUnaryCall;
    renameFile(request: fileserver_pb.RenameFileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileserver_pb.RenameFileResponse) => void): grpc.ClientUnaryCall;
    renameFile(request: fileserver_pb.RenameFileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileserver_pb.RenameFileResponse) => void): grpc.ClientUnaryCall;
    getFolderFiles(request: fileserver_pb.GetAllFilesRequest, callback: (error: grpc.ServiceError | null, response: fileserver_pb.GetAllFilesResponse) => void): grpc.ClientUnaryCall;
    getFolderFiles(request: fileserver_pb.GetAllFilesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileserver_pb.GetAllFilesResponse) => void): grpc.ClientUnaryCall;
    getFolderFiles(request: fileserver_pb.GetAllFilesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileserver_pb.GetAllFilesResponse) => void): grpc.ClientUnaryCall;
    getSharedFiles(request: fileserver_pb.GetSharedFilesRequest, callback: (error: grpc.ServiceError | null, response: fileserver_pb.GetSharedFilesResponse) => void): grpc.ClientUnaryCall;
    getSharedFiles(request: fileserver_pb.GetSharedFilesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileserver_pb.GetSharedFilesResponse) => void): grpc.ClientUnaryCall;
    getSharedFiles(request: fileserver_pb.GetSharedFilesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileserver_pb.GetSharedFilesResponse) => void): grpc.ClientUnaryCall;
    getCustomFiles(request: fileserver_pb.GetCustomFilesRequest, callback: (error: grpc.ServiceError | null, response: fileserver_pb.GetCustomFilesResponse) => void): grpc.ClientUnaryCall;
    getCustomFiles(request: fileserver_pb.GetCustomFilesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileserver_pb.GetCustomFilesResponse) => void): grpc.ClientUnaryCall;
    getCustomFiles(request: fileserver_pb.GetCustomFilesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileserver_pb.GetCustomFilesResponse) => void): grpc.ClientUnaryCall;
    getHomeSize(request: fileserver_pb.GetHomeSizeRequest, callback: (error: grpc.ServiceError | null, response: fileserver_pb.GetHomeSizeResponse) => void): grpc.ClientUnaryCall;
    getHomeSize(request: fileserver_pb.GetHomeSizeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileserver_pb.GetHomeSizeResponse) => void): grpc.ClientUnaryCall;
    getHomeSize(request: fileserver_pb.GetHomeSizeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileserver_pb.GetHomeSizeResponse) => void): grpc.ClientUnaryCall;
    getAlbumFiles(request: fileserver_pb.GetAllImagesRequest, callback: (error: grpc.ServiceError | null, response: fileserver_pb.GetAllImagesResponse) => void): grpc.ClientUnaryCall;
    getAlbumFiles(request: fileserver_pb.GetAllImagesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileserver_pb.GetAllImagesResponse) => void): grpc.ClientUnaryCall;
    getAlbumFiles(request: fileserver_pb.GetAllImagesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileserver_pb.GetAllImagesResponse) => void): grpc.ClientUnaryCall;
    getStreamingFiles(request: fileserver_pb.GetAllImagesRequest, callback: (error: grpc.ServiceError | null, response: fileserver_pb.GetAllImagesResponse) => void): grpc.ClientUnaryCall;
    getStreamingFiles(request: fileserver_pb.GetAllImagesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileserver_pb.GetAllImagesResponse) => void): grpc.ClientUnaryCall;
    getStreamingFiles(request: fileserver_pb.GetAllImagesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileserver_pb.GetAllImagesResponse) => void): grpc.ClientUnaryCall;
    upload(callback: (error: grpc.ServiceError | null, response: fileserver_pb.FileUploadResponse) => void): grpc.ClientWritableStream<fileserver_pb.FileUploadRequest>;
    upload(metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileserver_pb.FileUploadResponse) => void): grpc.ClientWritableStream<fileserver_pb.FileUploadRequest>;
    upload(options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileserver_pb.FileUploadResponse) => void): grpc.ClientWritableStream<fileserver_pb.FileUploadRequest>;
    upload(metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileserver_pb.FileUploadResponse) => void): grpc.ClientWritableStream<fileserver_pb.FileUploadRequest>;
    download(request: fileserver_pb.DownloadRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<fileserver_pb.DownloadResponse>;
    download(request: fileserver_pb.DownloadRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<fileserver_pb.DownloadResponse>;
    chmodFile(request: fileserver_pb.ChangePermissionsRequest, callback: (error: grpc.ServiceError | null, response: fileserver_pb.ChangePermissionsResponse) => void): grpc.ClientUnaryCall;
    chmodFile(request: fileserver_pb.ChangePermissionsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileserver_pb.ChangePermissionsResponse) => void): grpc.ClientUnaryCall;
    chmodFile(request: fileserver_pb.ChangePermissionsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileserver_pb.ChangePermissionsResponse) => void): grpc.ClientUnaryCall;
    moveFile(request: fileserver_pb.MoveFileRequest, callback: (error: grpc.ServiceError | null, response: fileserver_pb.MoveFileResponse) => void): grpc.ClientUnaryCall;
    moveFile(request: fileserver_pb.MoveFileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileserver_pb.MoveFileResponse) => void): grpc.ClientUnaryCall;
    moveFile(request: fileserver_pb.MoveFileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileserver_pb.MoveFileResponse) => void): grpc.ClientUnaryCall;
}

export class FilesRouteClient extends grpc.Client implements IFilesRouteClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public ping(request: fileserver_pb.PingRequest, callback: (error: grpc.ServiceError | null, response: fileserver_pb.PingReply) => void): grpc.ClientUnaryCall;
    public ping(request: fileserver_pb.PingRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileserver_pb.PingReply) => void): grpc.ClientUnaryCall;
    public ping(request: fileserver_pb.PingRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileserver_pb.PingReply) => void): grpc.ClientUnaryCall;
    public createFolder(request: fileserver_pb.CreateFolderRequest, callback: (error: grpc.ServiceError | null, response: fileserver_pb.CreateFolderResponse) => void): grpc.ClientUnaryCall;
    public createFolder(request: fileserver_pb.CreateFolderRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileserver_pb.CreateFolderResponse) => void): grpc.ClientUnaryCall;
    public createFolder(request: fileserver_pb.CreateFolderRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileserver_pb.CreateFolderResponse) => void): grpc.ClientUnaryCall;
    public getProperties(request: fileserver_pb.GetFileRequest, callback: (error: grpc.ServiceError | null, response: fileserver_pb.GetFileResponse) => void): grpc.ClientUnaryCall;
    public getProperties(request: fileserver_pb.GetFileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileserver_pb.GetFileResponse) => void): grpc.ClientUnaryCall;
    public getProperties(request: fileserver_pb.GetFileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileserver_pb.GetFileResponse) => void): grpc.ClientUnaryCall;
    public deleteFile(request: fileserver_pb.DeleteFileRequest, callback: (error: grpc.ServiceError | null, response: fileserver_pb.DeleteFileResponse) => void): grpc.ClientUnaryCall;
    public deleteFile(request: fileserver_pb.DeleteFileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileserver_pb.DeleteFileResponse) => void): grpc.ClientUnaryCall;
    public deleteFile(request: fileserver_pb.DeleteFileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileserver_pb.DeleteFileResponse) => void): grpc.ClientUnaryCall;
    public renameFile(request: fileserver_pb.RenameFileRequest, callback: (error: grpc.ServiceError | null, response: fileserver_pb.RenameFileResponse) => void): grpc.ClientUnaryCall;
    public renameFile(request: fileserver_pb.RenameFileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileserver_pb.RenameFileResponse) => void): grpc.ClientUnaryCall;
    public renameFile(request: fileserver_pb.RenameFileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileserver_pb.RenameFileResponse) => void): grpc.ClientUnaryCall;
    public getFolderFiles(request: fileserver_pb.GetAllFilesRequest, callback: (error: grpc.ServiceError | null, response: fileserver_pb.GetAllFilesResponse) => void): grpc.ClientUnaryCall;
    public getFolderFiles(request: fileserver_pb.GetAllFilesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileserver_pb.GetAllFilesResponse) => void): grpc.ClientUnaryCall;
    public getFolderFiles(request: fileserver_pb.GetAllFilesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileserver_pb.GetAllFilesResponse) => void): grpc.ClientUnaryCall;
    public getSharedFiles(request: fileserver_pb.GetSharedFilesRequest, callback: (error: grpc.ServiceError | null, response: fileserver_pb.GetSharedFilesResponse) => void): grpc.ClientUnaryCall;
    public getSharedFiles(request: fileserver_pb.GetSharedFilesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileserver_pb.GetSharedFilesResponse) => void): grpc.ClientUnaryCall;
    public getSharedFiles(request: fileserver_pb.GetSharedFilesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileserver_pb.GetSharedFilesResponse) => void): grpc.ClientUnaryCall;
    public getCustomFiles(request: fileserver_pb.GetCustomFilesRequest, callback: (error: grpc.ServiceError | null, response: fileserver_pb.GetCustomFilesResponse) => void): grpc.ClientUnaryCall;
    public getCustomFiles(request: fileserver_pb.GetCustomFilesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileserver_pb.GetCustomFilesResponse) => void): grpc.ClientUnaryCall;
    public getCustomFiles(request: fileserver_pb.GetCustomFilesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileserver_pb.GetCustomFilesResponse) => void): grpc.ClientUnaryCall;
    public getHomeSize(request: fileserver_pb.GetHomeSizeRequest, callback: (error: grpc.ServiceError | null, response: fileserver_pb.GetHomeSizeResponse) => void): grpc.ClientUnaryCall;
    public getHomeSize(request: fileserver_pb.GetHomeSizeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileserver_pb.GetHomeSizeResponse) => void): grpc.ClientUnaryCall;
    public getHomeSize(request: fileserver_pb.GetHomeSizeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileserver_pb.GetHomeSizeResponse) => void): grpc.ClientUnaryCall;
    public getAlbumFiles(request: fileserver_pb.GetAllImagesRequest, callback: (error: grpc.ServiceError | null, response: fileserver_pb.GetAllImagesResponse) => void): grpc.ClientUnaryCall;
    public getAlbumFiles(request: fileserver_pb.GetAllImagesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileserver_pb.GetAllImagesResponse) => void): grpc.ClientUnaryCall;
    public getAlbumFiles(request: fileserver_pb.GetAllImagesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileserver_pb.GetAllImagesResponse) => void): grpc.ClientUnaryCall;
    public getStreamingFiles(request: fileserver_pb.GetAllImagesRequest, callback: (error: grpc.ServiceError | null, response: fileserver_pb.GetAllImagesResponse) => void): grpc.ClientUnaryCall;
    public getStreamingFiles(request: fileserver_pb.GetAllImagesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileserver_pb.GetAllImagesResponse) => void): grpc.ClientUnaryCall;
    public getStreamingFiles(request: fileserver_pb.GetAllImagesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileserver_pb.GetAllImagesResponse) => void): grpc.ClientUnaryCall;
    public upload(callback: (error: grpc.ServiceError | null, response: fileserver_pb.FileUploadResponse) => void): grpc.ClientWritableStream<fileserver_pb.FileUploadRequest>;
    public upload(metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileserver_pb.FileUploadResponse) => void): grpc.ClientWritableStream<fileserver_pb.FileUploadRequest>;
    public upload(options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileserver_pb.FileUploadResponse) => void): grpc.ClientWritableStream<fileserver_pb.FileUploadRequest>;
    public upload(metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileserver_pb.FileUploadResponse) => void): grpc.ClientWritableStream<fileserver_pb.FileUploadRequest>;
    public download(request: fileserver_pb.DownloadRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<fileserver_pb.DownloadResponse>;
    public download(request: fileserver_pb.DownloadRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<fileserver_pb.DownloadResponse>;
    public chmodFile(request: fileserver_pb.ChangePermissionsRequest, callback: (error: grpc.ServiceError | null, response: fileserver_pb.ChangePermissionsResponse) => void): grpc.ClientUnaryCall;
    public chmodFile(request: fileserver_pb.ChangePermissionsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileserver_pb.ChangePermissionsResponse) => void): grpc.ClientUnaryCall;
    public chmodFile(request: fileserver_pb.ChangePermissionsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileserver_pb.ChangePermissionsResponse) => void): grpc.ClientUnaryCall;
    public moveFile(request: fileserver_pb.MoveFileRequest, callback: (error: grpc.ServiceError | null, response: fileserver_pb.MoveFileResponse) => void): grpc.ClientUnaryCall;
    public moveFile(request: fileserver_pb.MoveFileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: fileserver_pb.MoveFileResponse) => void): grpc.ClientUnaryCall;
    public moveFile(request: fileserver_pb.MoveFileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: fileserver_pb.MoveFileResponse) => void): grpc.ClientUnaryCall;
}
