"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesController = void 0;
const Controller_1 = __importDefault(require("../../infrastructure/express/controller/Controller"));
const fileserver_pb_1 = require("../../contracts/grpc/fileserver_pb");
const Logger_1 = require("../../util/Logger");
const FilesDataMapper_1 = require("../../infrastructure/dataMapper/FilesDataMapper");
const StorageManager_1 = require("../../infrastructure/middleware/StorageManager");
class FilesController extends Controller_1.default {
    fileService;
    fileCacheManager;
    logs;
    constructor(fileService, fileCacheManager) {
        super();
        this.fileService = fileService;
        this.fileCacheManager = fileCacheManager;
        this.logs = Logger_1.Logger.instance;
    }
    ping = (_req, res) => {
        try {
            this.logs.logInfo("controllers/ping", "Success");
            res.status(201).json({ message: "pong" });
        }
        catch (err) {
            this.logs.logError("controllers/ping", "Internal Server Error", err.message, 500);
            res.status(500).json(this.responseHandler.serverError());
        }
    };
    getUserStorage = (req, res) => {
        try {
            const { username } = req.body;
            (0, StorageManager_1.getMaxStorage)(req.cookies.tkn).then(maxStorage => {
                (0, StorageManager_1.getUsedStorage)(username).then(usedStorage => {
                    res.status(200).json(this.responseHandler.response("Valid", { maxStorage: maxStorage, usedStorage: usedStorage }));
                });
            }).catch(_err => {
                res.status(400).json(this.responseHandler.throwError("Bad bad"));
            });
        }
        catch (error) {
            this.logs.logError("controllers/validate", "Internal Server Error", error.message, 500);
            res.status(500).json(this.responseHandler.serverError());
        }
    };
    getFiles = async (req, res) => {
        try {
            const { hash } = req.query;
            if (!hash)
                throw Error();
            const fingerprint = hash.toString();
            const cacheFolder = await this.fileCacheManager.getFiles(fingerprint);
            if (cacheFolder.files.length > 0) {
                this.logs.logInfo("controllers/getFiles", `Path:${cacheFolder.path}`, 200);
                res.status(200).json(this.responseHandler.response("Success", { files: cacheFolder.files, path: cacheFolder.path }));
            }
            else {
                this.fileService.getFolderFiles(fingerprint).then(value => {
                    const files = (0, FilesDataMapper_1.getFileList)(value.data?.files || [], `${req.protocol}://${req.get("host")}`);
                    if (files)
                        this.fileCacheManager.save(fingerprint, files);
                    this.logs.logInfo("controllers/getFiles", `Success`, 200);
                    res.status(200).json(this.responseHandler.response(value.message, { files: files, path: value.data?.path }));
                }).catch((err) => {
                    this.logs.logError("controllers/getFiles", "Internal Server Error", err.message, 500);
                    res.status(500).json(this.responseHandler.serverError());
                });
            }
        }
        catch (err) {
            this.logs.logError("controllers/getFiles", "Internal Server Error", err.message, 500);
            res.status(500).json(this.responseHandler.serverError());
        }
    };
    getHome = (req, res) => {
        try {
            const { username } = req.body;
            this.fileService.getCustom(username, "home").then(value => {
                const files = (0, FilesDataMapper_1.getFileList)(value.data?.files || [], `${req.protocol}://${req.get("host")}`);
                this.logs.logInfo("controllers/getHome", `${value.message}`, 200, username);
                res.status(200).json(this.responseHandler.response(value.message, { files: files, fingerprint: value.data?.fingerprint }));
            }).catch((error) => {
                this.logs.logError("controllers/getHome", "Internal Server Error", error.message, 500);
                res.status(500).json(this.responseHandler.serverError());
            });
        }
        catch (error) {
            this.logs.logError("controllers/getHome", "Internal Server Error", error.message, 500);
            res.status(500).json(this.responseHandler.serverError());
        }
    };
    getShared = (req, res) => {
        try {
            const { username, groups } = req.body;
            console.log("username:", username, "groups:", groups);
            this.fileService.getShared(username, groups).then(value => {
                const files = (0, FilesDataMapper_1.getFileList)(value.data?.files || [], `${req.protocol}://${req.get("host")}`);
                this.logs.logInfo("controllers/getShared", `${value.message}`, 200, username);
                res.status(200).json(this.responseHandler.response(value.message, { files: files, fingerprint: value.data?.fingerprint }));
            }).catch((error) => {
                this.logs.logError("controllers/getShared", "Internal Server Error", error.message, 500);
                res.status(500).json(this.responseHandler.serverError());
            });
        }
        catch (error) {
            this.logs.logError("controllers/getShared", "Internal Server Error", error.message, 500);
            res.status(500).json(this.responseHandler.serverError());
        }
    };
    getImages = (req, res) => {
        try {
            const { username } = req.body;
            console.log("username:", username);
            this.fileService.getAlbum(username).then(value => {
                const files = (0, FilesDataMapper_1.getFileList)(value.data || [], `${req.protocol}://${req.get("host")}`);
                this.logs.logInfo("controllers/getImages", `${value.message}`, 200, username);
                res.status(200).json(this.responseHandler.response(value.message, files));
            }).catch((error) => {
                this.logs.logError("controllers/getImages", "Internal Server Error", error.message, 500);
                res.status(500).json(this.responseHandler.serverError());
            });
        }
        catch (error) {
            this.logs.logError("controllers/getImages", "Internal Server Error", error.message, 500);
            res.status(500).json(this.responseHandler.serverError());
        }
    };
    deleteFile = async (req, res) => {
        try {
            const { folderFingerprint, fingerprint } = req.body;
            this.fileService.deleteFile(fingerprint).then(value => {
                if (value.success) {
                    this.fileCacheManager.delete(folderFingerprint, fingerprint);
                    this.logs.logInfo("controllers/deleteFile", `${value.message}`, 200);
                    res.status(200).json(this.responseHandler.response(value.message));
                }
                else {
                    this.logs.logError("controllers/deleteFile", "Not Found?", value.message, 404);
                    res.status(404).json(this.responseHandler.response(value.message));
                }
            }).catch((error) => {
                this.logs.logError("controllers/deleteFile", "Internal Server Error", error.message, 500);
                res.status(500).json(this.responseHandler.serverError());
            });
        }
        catch (error) {
            this.logs.logError("controllers/deleteFile", "Internal Server Error", error.message, 500);
            res.status(500).json(this.responseHandler.serverError());
        }
    };
    renameFile = (req, res) => {
        try {
            const { fingerprint, newName } = req.body;
            this.fileService.renameFile(fingerprint, newName).then(value => {
                this.logs.logInfo("controllers/renameFile", `${value.message}`, 200);
                res.status(200).json(this.responseHandler.response(value.message));
            }).catch((error) => {
                this.logs.logError("controllers/renameFile", "Internal Server Error", error.message, 500);
                res.status(500).json(this.responseHandler.serverError());
            });
        }
        catch (error) {
            this.logs.logError("controllers/renameFile", "Internal Server Error", error.message, 500);
            res.status(500).json(this.responseHandler.serverError());
        }
    };
    changePermissions = (req, res) => {
        try {
            const { folder, fingerprint, permissions } = req.body;
            this.fileService.changePermissions(fingerprint, permissions).then(value => {
                this.logs.logInfo("controllers/changePermissions", `${value.message}`, 200);
                this.fileCacheManager.update(folder, fingerprint, permissions);
                res.status(200).json(this.responseHandler.response(value.message));
            }).catch(error => {
                this.logs.logError("controllers/changePermissions", "Internal Server Error", error.message, 500);
                res.status(500).json(this.responseHandler.serverError());
            });
        }
        catch (error) {
            this.logs.logError("controllers/changePermissions", "Internal Server Error", error.message, 500);
            res.status(500).json(this.responseHandler.serverError());
        }
    };
    createFolder = async (req, res) => {
        try {
            const { folderFingerprint, name, username } = req.body;
            this.fileService.createFolder(folderFingerprint, name, username).then(value => {
                const createdFolder = value.data;
                if (!createdFolder) {
                    this.logs.logError("controllers/createFolder", "Bad Request", value.message, 400);
                    res.status(400).json(this.responseHandler.throwError(value.message));
                    return;
                }
                const folder = (0, FilesDataMapper_1.GRPCfileToDomain)(createdFolder, `${req.protocol}://${req.get("host")}`);
                this.fileCacheManager.saveOne(folderFingerprint, folder);
                this.logs.logInfo("controllers/createFolder", `${value.message}`, 200, username);
                res.status(201).json(this.responseHandler.response(value.message, folder));
            }).catch(error => {
                this.logs.logError("controllers/createFolder", "Internal Server Error", error.message, 500);
                res.status(500).json(this.responseHandler.serverError());
            });
        }
        catch (error) {
            this.logs.logError("controllers/createFolder", "Internal Server Error", error.message, 500);
            res.status(500).json(this.responseHandler.serverError());
        }
    };
    save = async (req, res) => {
        try {
            const { username } = req.body;
            if (req.file && req.body.folderFingerprint && username) {
                this.logs.logInfo("controllers/save", `Uploading File...`, 200, username);
                const buffer = req.file.buffer;
                const folderFingerprint = req.body.folderFingerprint;
                const fileName = req.file.originalname;
                this.fileService.upload(buffer, folderFingerprint, fileName, username).then(grpcRes => {
                    const file = grpcRes.getFile();
                    if (file !== undefined) {
                        const savedFile = (0, FilesDataMapper_1.GRPCfileToDomain)(file, `${req.protocol}://${req.get("host")}`);
                        this.fileCacheManager.saveOne(folderFingerprint, savedFile);
                        this.logs.logInfo("controllers/save", `File upload succesfully`, 200, username);
                        res.status(201).json(this.responseHandler.response("File upload succesfully", savedFile));
                        return;
                    }
                    this.logs.logError("controllers/save", "Error al subir archivo", "Error al subir archivo", 400);
                    res.status(400).json(this.responseHandler.throwError("Error al subir archivo"));
                }).catch(error => {
                    this.logs.logError("controllers/save", "Internal Server Error", error.message, 500);
                    res.status(500).json(this.responseHandler.serverError());
                });
            }
            else {
                this.logs.logError("controllers/save", "Bad Request", "Check your request", 400);
                res.status(400).json(this.responseHandler.throwError("Check your request"));
            }
        }
        catch (error) {
            this.logs.logError("controllers/save", "Internal Server Error", error.message, 500);
            res.status(500).json(this.responseHandler.serverError());
        }
    };
    /**
     * Descarga un archivo dada una ruta relativa
     * @param req
     * @param res
     */
    downloadFile = (req, res) => {
        try {
            const { hash } = req.query;
            const downloadRequest = new fileserver_pb_1.DownloadRequest();
            downloadRequest.setFingerprint(hash?.toString() || '');
            res.setHeader('Content-Disposition', `attachment; filename="file"`);
            res.setHeader('Content-Type', 'application/octet-stream');
            const call = this.fileService.getClient().download(downloadRequest);
            call.on('data', (response) => {
                res.write(response.getChunk_asU8());
            });
            call.on('end', () => {
                this.logs.logInfo("controllers/downloadFile", `File download succesfully`, 200);
                res.end();
            });
            call.on('error', (error) => {
                this.logs.logError("controllers/downloadFile", "Internal Server Error", error.message, 500);
                res.status(500).send('Error during file download.');
            });
        }
        catch (error) {
            this.logs.logError("controllers/downloadFile", "Internal Server Error", error.message, 500);
            res.status(500).json(this.responseHandler.serverError());
        }
    };
}
exports.FilesController = FilesController;
//# sourceMappingURL=FilesController.js.map