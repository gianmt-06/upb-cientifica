import { File } from "../../domain/File"
import { Folder } from "../../infrastructure/cache/FilesCacheManager"

export interface CacheManagerInterface {
    getFiles(fingerprint: string): Promise<Folder>
    save(fingerprint: string, files: File[]): Promise<boolean>
    saveOne(fingerprint: string, file: File): Promise<boolean>
    update(folderFingerprint: string, fileFingerPrint: string, value: string): Promise<boolean> 
    delete(folderFingerprint: string, fileFingerPrint: string): Promise<boolean> 
}