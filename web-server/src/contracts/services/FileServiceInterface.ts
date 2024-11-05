import { GRPCResponse } from "../../util/GRPCResponseManager"
import { FilesRouteClient } from "../grpc/storage/fileserver_grpc_pb"
import { File, FileUploadResponse } from "../grpc/storage/fileserver_pb"

export interface FilesServiceInterface {
    getFolderFiles(folderFingerprint: string): Promise<GRPCResponse<{ files: File[], path: string }>>
    getCustom(user: string, folder: string): Promise<GRPCResponse<{ files: File[], fingerprint: string }>>
    getShared(user: string, groups: string[]): Promise<GRPCResponse<{ files: File[], fingerprint: string }>>
    createFolder(folderFingerprint: string, folderName: string, username: string): Promise<GRPCResponse<File>>
    getProperties(fileFingerprint: string): void
    deleteFile(fileFingerprint: string): Promise<GRPCResponse<void>>
    getHomeSize(user: string): Promise<GRPCResponse<number>>
    renameFile(fileFingerprint: string, newName: string): Promise<GRPCResponse<void>>
    upload(buffer: Buffer, folderFingerprint: string, fileName: string, username: string): Promise<FileUploadResponse>
    getAlbum(user: string): Promise<GRPCResponse<File[]>>
    getClient(): FilesRouteClient
    changePermissions(fingerprint: string, permissions: string): Promise<GRPCResponse<void>>
}