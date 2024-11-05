// package: pb
// file: fileserver.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class File extends jspb.Message { 
    getFingerprint(): string;
    setFingerprint(value: string): File;
    getName(): string;
    setName(value: string): File;
    getSize(): number;
    setSize(value: number): File;
    getModified(): string;
    setModified(value: string): File;
    getPermissions(): string;
    setPermissions(value: string): File;
    getOwner(): string;
    setOwner(value: string): File;
    getMimetype(): string;
    setMimetype(value: string): File;
    getPath(): string;
    setPath(value: string): File;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): File.AsObject;
    static toObject(includeInstance: boolean, msg: File): File.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: File, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): File;
    static deserializeBinaryFromReader(message: File, reader: jspb.BinaryReader): File;
}

export namespace File {
    export type AsObject = {
        fingerprint: string,
        name: string,
        size: number,
        modified: string,
        permissions: string,
        owner: string,
        mimetype: string,
        path: string,
    }
}

export class Response extends jspb.Message { 
    getSucces(): boolean;
    setSucces(value: boolean): Response;
    getCode(): number;
    setCode(value: number): Response;
    getMessage(): string;
    setMessage(value: string): Response;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Response.AsObject;
    static toObject(includeInstance: boolean, msg: Response): Response.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Response, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Response;
    static deserializeBinaryFromReader(message: Response, reader: jspb.BinaryReader): Response;
}

export namespace Response {
    export type AsObject = {
        succes: boolean,
        code: number,
        message: string,
    }
}

export class PingRequest extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PingRequest.AsObject;
    static toObject(includeInstance: boolean, msg: PingRequest): PingRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PingRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PingRequest;
    static deserializeBinaryFromReader(message: PingRequest, reader: jspb.BinaryReader): PingRequest;
}

export namespace PingRequest {
    export type AsObject = {
    }
}

export class PingReply extends jspb.Message { 
    getMessage(): string;
    setMessage(value: string): PingReply;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PingReply.AsObject;
    static toObject(includeInstance: boolean, msg: PingReply): PingReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PingReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PingReply;
    static deserializeBinaryFromReader(message: PingReply, reader: jspb.BinaryReader): PingReply;
}

export namespace PingReply {
    export type AsObject = {
        message: string,
    }
}

export class GetHomeSizeRequest extends jspb.Message { 
    getUser(): string;
    setUser(value: string): GetHomeSizeRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetHomeSizeRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetHomeSizeRequest): GetHomeSizeRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetHomeSizeRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetHomeSizeRequest;
    static deserializeBinaryFromReader(message: GetHomeSizeRequest, reader: jspb.BinaryReader): GetHomeSizeRequest;
}

export namespace GetHomeSizeRequest {
    export type AsObject = {
        user: string,
    }
}

export class GetHomeSizeResponse extends jspb.Message { 
    getSize(): number;
    setSize(value: number): GetHomeSizeResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetHomeSizeResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetHomeSizeResponse): GetHomeSizeResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetHomeSizeResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetHomeSizeResponse;
    static deserializeBinaryFromReader(message: GetHomeSizeResponse, reader: jspb.BinaryReader): GetHomeSizeResponse;
}

export namespace GetHomeSizeResponse {
    export type AsObject = {
        size: number,
    }
}

export class ChangePermissionsRequest extends jspb.Message { 
    getFingerprint(): string;
    setFingerprint(value: string): ChangePermissionsRequest;
    getPermissions(): string;
    setPermissions(value: string): ChangePermissionsRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ChangePermissionsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ChangePermissionsRequest): ChangePermissionsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ChangePermissionsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ChangePermissionsRequest;
    static deserializeBinaryFromReader(message: ChangePermissionsRequest, reader: jspb.BinaryReader): ChangePermissionsRequest;
}

export namespace ChangePermissionsRequest {
    export type AsObject = {
        fingerprint: string,
        permissions: string,
    }
}

export class ChangePermissionsResponse extends jspb.Message { 

    hasResponse(): boolean;
    clearResponse(): void;
    getResponse(): Response | undefined;
    setResponse(value?: Response): ChangePermissionsResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ChangePermissionsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ChangePermissionsResponse): ChangePermissionsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ChangePermissionsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ChangePermissionsResponse;
    static deserializeBinaryFromReader(message: ChangePermissionsResponse, reader: jspb.BinaryReader): ChangePermissionsResponse;
}

export namespace ChangePermissionsResponse {
    export type AsObject = {
        response?: Response.AsObject,
    }
}

export class GetCustomFilesRequest extends jspb.Message { 
    getUser(): string;
    setUser(value: string): GetCustomFilesRequest;
    getFolder(): string;
    setFolder(value: string): GetCustomFilesRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetCustomFilesRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetCustomFilesRequest): GetCustomFilesRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetCustomFilesRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetCustomFilesRequest;
    static deserializeBinaryFromReader(message: GetCustomFilesRequest, reader: jspb.BinaryReader): GetCustomFilesRequest;
}

export namespace GetCustomFilesRequest {
    export type AsObject = {
        user: string,
        folder: string,
    }
}

export class GetCustomFilesResponse extends jspb.Message { 

    hasResponse(): boolean;
    clearResponse(): void;
    getResponse(): Response | undefined;
    setResponse(value?: Response): GetCustomFilesResponse;
    clearFilesList(): void;
    getFilesList(): Array<File>;
    setFilesList(value: Array<File>): GetCustomFilesResponse;
    addFiles(value?: File, index?: number): File;
    getFingerprint(): string;
    setFingerprint(value: string): GetCustomFilesResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetCustomFilesResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetCustomFilesResponse): GetCustomFilesResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetCustomFilesResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetCustomFilesResponse;
    static deserializeBinaryFromReader(message: GetCustomFilesResponse, reader: jspb.BinaryReader): GetCustomFilesResponse;
}

export namespace GetCustomFilesResponse {
    export type AsObject = {
        response?: Response.AsObject,
        filesList: Array<File.AsObject>,
        fingerprint: string,
    }
}

export class GetAllImagesRequest extends jspb.Message { 
    getUser(): string;
    setUser(value: string): GetAllImagesRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetAllImagesRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetAllImagesRequest): GetAllImagesRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetAllImagesRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetAllImagesRequest;
    static deserializeBinaryFromReader(message: GetAllImagesRequest, reader: jspb.BinaryReader): GetAllImagesRequest;
}

export namespace GetAllImagesRequest {
    export type AsObject = {
        user: string,
    }
}

export class GetAllImagesResponse extends jspb.Message { 

    hasResponse(): boolean;
    clearResponse(): void;
    getResponse(): Response | undefined;
    setResponse(value?: Response): GetAllImagesResponse;
    clearFilesList(): void;
    getFilesList(): Array<File>;
    setFilesList(value: Array<File>): GetAllImagesResponse;
    addFiles(value?: File, index?: number): File;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetAllImagesResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetAllImagesResponse): GetAllImagesResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetAllImagesResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetAllImagesResponse;
    static deserializeBinaryFromReader(message: GetAllImagesResponse, reader: jspb.BinaryReader): GetAllImagesResponse;
}

export namespace GetAllImagesResponse {
    export type AsObject = {
        response?: Response.AsObject,
        filesList: Array<File.AsObject>,
    }
}

export class GetAllFilesRequest extends jspb.Message { 
    getFolderfingerprint(): string;
    setFolderfingerprint(value: string): GetAllFilesRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetAllFilesRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetAllFilesRequest): GetAllFilesRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetAllFilesRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetAllFilesRequest;
    static deserializeBinaryFromReader(message: GetAllFilesRequest, reader: jspb.BinaryReader): GetAllFilesRequest;
}

export namespace GetAllFilesRequest {
    export type AsObject = {
        folderfingerprint: string,
    }
}

export class GetAllFilesResponse extends jspb.Message { 

    hasResponse(): boolean;
    clearResponse(): void;
    getResponse(): Response | undefined;
    setResponse(value?: Response): GetAllFilesResponse;
    getFolderpath(): string;
    setFolderpath(value: string): GetAllFilesResponse;
    clearFilesList(): void;
    getFilesList(): Array<File>;
    setFilesList(value: Array<File>): GetAllFilesResponse;
    addFiles(value?: File, index?: number): File;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetAllFilesResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetAllFilesResponse): GetAllFilesResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetAllFilesResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetAllFilesResponse;
    static deserializeBinaryFromReader(message: GetAllFilesResponse, reader: jspb.BinaryReader): GetAllFilesResponse;
}

export namespace GetAllFilesResponse {
    export type AsObject = {
        response?: Response.AsObject,
        folderpath: string,
        filesList: Array<File.AsObject>,
    }
}

export class GetSharedFilesRequest extends jspb.Message { 
    getUsername(): string;
    setUsername(value: string): GetSharedFilesRequest;
    clearGroupsList(): void;
    getGroupsList(): Array<string>;
    setGroupsList(value: Array<string>): GetSharedFilesRequest;
    addGroups(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetSharedFilesRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetSharedFilesRequest): GetSharedFilesRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetSharedFilesRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetSharedFilesRequest;
    static deserializeBinaryFromReader(message: GetSharedFilesRequest, reader: jspb.BinaryReader): GetSharedFilesRequest;
}

export namespace GetSharedFilesRequest {
    export type AsObject = {
        username: string,
        groupsList: Array<string>,
    }
}

export class GetSharedFilesResponse extends jspb.Message { 

    hasResponse(): boolean;
    clearResponse(): void;
    getResponse(): Response | undefined;
    setResponse(value?: Response): GetSharedFilesResponse;
    clearFilesList(): void;
    getFilesList(): Array<File>;
    setFilesList(value: Array<File>): GetSharedFilesResponse;
    addFiles(value?: File, index?: number): File;
    getFingerprint(): string;
    setFingerprint(value: string): GetSharedFilesResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetSharedFilesResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetSharedFilesResponse): GetSharedFilesResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetSharedFilesResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetSharedFilesResponse;
    static deserializeBinaryFromReader(message: GetSharedFilesResponse, reader: jspb.BinaryReader): GetSharedFilesResponse;
}

export namespace GetSharedFilesResponse {
    export type AsObject = {
        response?: Response.AsObject,
        filesList: Array<File.AsObject>,
        fingerprint: string,
    }
}

export class CreateFolderRequest extends jspb.Message { 
    getFolderfingerprint(): string;
    setFolderfingerprint(value: string): CreateFolderRequest;
    getFoldername(): string;
    setFoldername(value: string): CreateFolderRequest;
    getOwner(): string;
    setOwner(value: string): CreateFolderRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateFolderRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CreateFolderRequest): CreateFolderRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateFolderRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateFolderRequest;
    static deserializeBinaryFromReader(message: CreateFolderRequest, reader: jspb.BinaryReader): CreateFolderRequest;
}

export namespace CreateFolderRequest {
    export type AsObject = {
        folderfingerprint: string,
        foldername: string,
        owner: string,
    }
}

export class CreateFolderResponse extends jspb.Message { 

    hasResponse(): boolean;
    clearResponse(): void;
    getResponse(): Response | undefined;
    setResponse(value?: Response): CreateFolderResponse;

    hasFolder(): boolean;
    clearFolder(): void;
    getFolder(): File | undefined;
    setFolder(value?: File): CreateFolderResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateFolderResponse.AsObject;
    static toObject(includeInstance: boolean, msg: CreateFolderResponse): CreateFolderResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateFolderResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateFolderResponse;
    static deserializeBinaryFromReader(message: CreateFolderResponse, reader: jspb.BinaryReader): CreateFolderResponse;
}

export namespace CreateFolderResponse {
    export type AsObject = {
        response?: Response.AsObject,
        folder?: File.AsObject,
    }
}

export class RenameFileRequest extends jspb.Message { 
    getFingerprint(): string;
    setFingerprint(value: string): RenameFileRequest;
    getNewname(): string;
    setNewname(value: string): RenameFileRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RenameFileRequest.AsObject;
    static toObject(includeInstance: boolean, msg: RenameFileRequest): RenameFileRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RenameFileRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RenameFileRequest;
    static deserializeBinaryFromReader(message: RenameFileRequest, reader: jspb.BinaryReader): RenameFileRequest;
}

export namespace RenameFileRequest {
    export type AsObject = {
        fingerprint: string,
        newname: string,
    }
}

export class RenameFileResponse extends jspb.Message { 

    hasResponse(): boolean;
    clearResponse(): void;
    getResponse(): Response | undefined;
    setResponse(value?: Response): RenameFileResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RenameFileResponse.AsObject;
    static toObject(includeInstance: boolean, msg: RenameFileResponse): RenameFileResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RenameFileResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RenameFileResponse;
    static deserializeBinaryFromReader(message: RenameFileResponse, reader: jspb.BinaryReader): RenameFileResponse;
}

export namespace RenameFileResponse {
    export type AsObject = {
        response?: Response.AsObject,
    }
}

export class FileUploadRequest extends jspb.Message { 
    getFilename(): string;
    setFilename(value: string): FileUploadRequest;
    getFolderfingerprint(): string;
    setFolderfingerprint(value: string): FileUploadRequest;
    getChunk(): Uint8Array | string;
    getChunk_asU8(): Uint8Array;
    getChunk_asB64(): string;
    setChunk(value: Uint8Array | string): FileUploadRequest;
    getUsername(): string;
    setUsername(value: string): FileUploadRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FileUploadRequest.AsObject;
    static toObject(includeInstance: boolean, msg: FileUploadRequest): FileUploadRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FileUploadRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FileUploadRequest;
    static deserializeBinaryFromReader(message: FileUploadRequest, reader: jspb.BinaryReader): FileUploadRequest;
}

export namespace FileUploadRequest {
    export type AsObject = {
        filename: string,
        folderfingerprint: string,
        chunk: Uint8Array | string,
        username: string,
    }
}

export class FileUploadResponse extends jspb.Message { 

    hasFile(): boolean;
    clearFile(): void;
    getFile(): File | undefined;
    setFile(value?: File): FileUploadResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FileUploadResponse.AsObject;
    static toObject(includeInstance: boolean, msg: FileUploadResponse): FileUploadResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FileUploadResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FileUploadResponse;
    static deserializeBinaryFromReader(message: FileUploadResponse, reader: jspb.BinaryReader): FileUploadResponse;
}

export namespace FileUploadResponse {
    export type AsObject = {
        file?: File.AsObject,
    }
}

export class GetFileRequest extends jspb.Message { 
    getFingerprint(): string;
    setFingerprint(value: string): GetFileRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetFileRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetFileRequest): GetFileRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetFileRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetFileRequest;
    static deserializeBinaryFromReader(message: GetFileRequest, reader: jspb.BinaryReader): GetFileRequest;
}

export namespace GetFileRequest {
    export type AsObject = {
        fingerprint: string,
    }
}

export class GetFileResponse extends jspb.Message { 

    hasResponse(): boolean;
    clearResponse(): void;
    getResponse(): Response | undefined;
    setResponse(value?: Response): GetFileResponse;

    hasFile(): boolean;
    clearFile(): void;
    getFile(): File | undefined;
    setFile(value?: File): GetFileResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetFileResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetFileResponse): GetFileResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetFileResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetFileResponse;
    static deserializeBinaryFromReader(message: GetFileResponse, reader: jspb.BinaryReader): GetFileResponse;
}

export namespace GetFileResponse {
    export type AsObject = {
        response?: Response.AsObject,
        file?: File.AsObject,
    }
}

export class DeleteFileRequest extends jspb.Message { 
    getFingerprint(): string;
    setFingerprint(value: string): DeleteFileRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteFileRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteFileRequest): DeleteFileRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteFileRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteFileRequest;
    static deserializeBinaryFromReader(message: DeleteFileRequest, reader: jspb.BinaryReader): DeleteFileRequest;
}

export namespace DeleteFileRequest {
    export type AsObject = {
        fingerprint: string,
    }
}

export class DeleteFileResponse extends jspb.Message { 

    hasResponse(): boolean;
    clearResponse(): void;
    getResponse(): Response | undefined;
    setResponse(value?: Response): DeleteFileResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteFileResponse.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteFileResponse): DeleteFileResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteFileResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteFileResponse;
    static deserializeBinaryFromReader(message: DeleteFileResponse, reader: jspb.BinaryReader): DeleteFileResponse;
}

export namespace DeleteFileResponse {
    export type AsObject = {
        response?: Response.AsObject,
    }
}

export class MoveFileRequest extends jspb.Message { 
    getFolderfingerprint(): string;
    setFolderfingerprint(value: string): MoveFileRequest;
    getNewpath(): string;
    setNewpath(value: string): MoveFileRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MoveFileRequest.AsObject;
    static toObject(includeInstance: boolean, msg: MoveFileRequest): MoveFileRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MoveFileRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MoveFileRequest;
    static deserializeBinaryFromReader(message: MoveFileRequest, reader: jspb.BinaryReader): MoveFileRequest;
}

export namespace MoveFileRequest {
    export type AsObject = {
        folderfingerprint: string,
        newpath: string,
    }
}

export class MoveFileResponse extends jspb.Message { 

    hasResponse(): boolean;
    clearResponse(): void;
    getResponse(): Response | undefined;
    setResponse(value?: Response): MoveFileResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MoveFileResponse.AsObject;
    static toObject(includeInstance: boolean, msg: MoveFileResponse): MoveFileResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MoveFileResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MoveFileResponse;
    static deserializeBinaryFromReader(message: MoveFileResponse, reader: jspb.BinaryReader): MoveFileResponse;
}

export namespace MoveFileResponse {
    export type AsObject = {
        response?: Response.AsObject,
    }
}

export class DownloadRequest extends jspb.Message { 
    getFingerprint(): string;
    setFingerprint(value: string): DownloadRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DownloadRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DownloadRequest): DownloadRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DownloadRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DownloadRequest;
    static deserializeBinaryFromReader(message: DownloadRequest, reader: jspb.BinaryReader): DownloadRequest;
}

export namespace DownloadRequest {
    export type AsObject = {
        fingerprint: string,
    }
}

export class DownloadResponse extends jspb.Message { 
    getChunk(): Uint8Array | string;
    getChunk_asU8(): Uint8Array;
    getChunk_asB64(): string;
    setChunk(value: Uint8Array | string): DownloadResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DownloadResponse.AsObject;
    static toObject(includeInstance: boolean, msg: DownloadResponse): DownloadResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DownloadResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DownloadResponse;
    static deserializeBinaryFromReader(message: DownloadResponse, reader: jspb.BinaryReader): DownloadResponse;
}

export namespace DownloadResponse {
    export type AsObject = {
        chunk: Uint8Array | string,
    }
}
