import { CacheManagerInterface } from "../../contracts/services/CacheManagerInterface";
import { File } from "../../domain/File";
import { Logger } from "../../util/Logger";
import { RedisDBC } from "./RedisConnection";

export interface Folder {
    files: File[],
    path: string
}

export class FilesCacheManager implements CacheManagerInterface {
    private logs: Logger;

    constructor(
        private readonly redisDBC: RedisDBC
    ) {
        this.logs = Logger.instance;
    }

    public getFiles = async (fingerprint: string): Promise<Folder> => {
        const cacheFolder = await this.redisDBC.getClient().get(fingerprint);
        console.log("cacheee");
        
        if (cacheFolder) return JSON.parse(cacheFolder) as Folder
        else return {files: [], path: ""}
    }

    public save = async (fingerprint: string, files: File[]): Promise<boolean> => {
        try {    
            if (files.length > 0) {
                const path = files[0]._path.substring(0, files[0]._path.lastIndexOf('/'))
    
                const folder = {
                    files: files,
                    path: path
                }
                
                await this.redisDBC.getClient().set(fingerprint, JSON.stringify(folder), { EX: 60 * 60 })

                return true
            }        

            return false;
        } catch (error) {
            this.logs.logError("cache/save", "error",(error as Error).message);
            return false;
        }
    }

    public saveOne = async (fingerprint: string, file: File): Promise<boolean> => {
        try {            
            const cacheFolder = await this.getFiles(fingerprint);
            const files = cacheFolder.files;

            if (files) {  
                files.push(file)
                this.save(fingerprint, files)
            }
            this.logs.logInfo("cache/saveOne", "Saved");

            return true
        } catch (error) {
            this.logs.logError("cache/save", "error",(error as Error).message);
            return false;
        }
    }

    public update = async (folderFingerprint: string, fileFingerPrint: string, value: string): Promise<boolean> => {
        try {            
            const cacheFolder = await this.getFiles(folderFingerprint);
            const files = cacheFolder.files;            

            files.map(file => {
                if (file._id === fileFingerPrint) {
                    file._permissions = value;
                }
            })

            this.save(folderFingerprint, files);
            this.logs.logInfo("cache/update", `Updated permissions ${fileFingerPrint}: ${value}`);

            return true
        } catch (error) {
            this.logs.logError("cache/update", "error",(error as Error).message);
            return false;
        }
    }

    public delete = async (folderFingerprint: string, fileFingerPrint: string): Promise<boolean> => {
        try {
            const cacheFolder = await this.getFiles(folderFingerprint);
            const files = cacheFolder.files;

            if (files.length > 0) {
                const filter = files.filter(file => {
                    return file._id !== fileFingerPrint;
                });

                await this.save(folderFingerprint, filter);
                this.logs.logInfo("cache/delete", "Deleted");

                return true
            }

            return false
        } catch (error) {
            this.logs.logError("cache/save", "error",(error as Error).message);
            return false;
        }
    }
}