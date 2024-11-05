"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesCacheManager = void 0;
const Logger_1 = require("../../util/Logger");
class FilesCacheManager {
    redisDBC;
    logs;
    constructor(redisDBC) {
        this.redisDBC = redisDBC;
        this.logs = Logger_1.Logger.instance;
    }
    getFiles = async (fingerprint) => {
        const cacheFolder = await this.redisDBC.getClient().get(fingerprint);
        console.log("cacheee");
        if (cacheFolder)
            return JSON.parse(cacheFolder);
        else
            return { files: [], path: "" };
    };
    save = async (fingerprint, files) => {
        try {
            if (files.length > 0) {
                const path = files[0]._path.substring(0, files[0]._path.lastIndexOf('/'));
                const folder = {
                    files: files,
                    path: path
                };
                await this.redisDBC.getClient().set(fingerprint, JSON.stringify(folder), { EX: 60 * 60 });
                return true;
            }
            return false;
        }
        catch (error) {
            this.logs.logError("cache/save", "error", error.message);
            return false;
        }
    };
    saveOne = async (fingerprint, file) => {
        try {
            const cacheFolder = await this.getFiles(fingerprint);
            const files = cacheFolder.files;
            if (files) {
                files.push(file);
                this.save(fingerprint, files);
            }
            this.logs.logInfo("cache/saveOne", "Saved");
            return true;
        }
        catch (error) {
            this.logs.logError("cache/save", "error", error.message);
            return false;
        }
    };
    update = async (folderFingerprint, fileFingerPrint, /* attributte: string,*/ value) => {
        try {
            const cacheFolder = await this.getFiles(folderFingerprint);
            const files = cacheFolder.files;
            files.map(file => {
                if (file._id === fileFingerPrint) {
                    file._permissions = value;
                }
            });
            this.save(folderFingerprint, files);
            this.logs.logInfo("cache/update", `Updated permissions ${fileFingerPrint}: ${value}`);
            return true;
        }
        catch (error) {
            this.logs.logError("cache/update", "error", error.message);
            return false;
        }
    };
    delete = async (folderFingerprint, fileFingerPrint) => {
        try {
            const cacheFolder = await this.getFiles(folderFingerprint);
            const files = cacheFolder.files;
            if (files.length > 0) {
                const filter = files.filter(file => {
                    return file._id !== fileFingerPrint;
                });
                await this.save(folderFingerprint, filter);
                this.logs.logInfo("cache/delete", "Deleted");
                return true;
            }
            return false;
        }
        catch (error) {
            this.logs.logError("cache/save", "error", error.message);
            return false;
        }
    };
}
exports.FilesCacheManager = FilesCacheManager;
//# sourceMappingURL=FilesCacheManager.js.map