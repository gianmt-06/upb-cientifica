import { Request, Response } from "express";
import Controller from "../../infrastructure/express/controller/Controller"
import { DownloadRequest, DownloadResponse } from "../../contracts/grpc/storage/fileserver_pb";
import { Logger } from "../../util/Logger";
import { getFileList, GRPCfileToDomain } from "../../infrastructure/dataMapper/FilesDataMapper";
import { getMaxStorage, getUsedStorage } from "../../infrastructure/middleware/StorageManager";
import axios from "axios";
import { Environment } from "../../environment/Environment";
import { CacheManagerInterface } from "../../contracts/services/CacheManagerInterface";
import { FilesServiceInterface } from "../../contracts/services/FileServiceInterface";

export class FilesController extends Controller {
    private logs: Logger;
    private readonly env: Environment;

    constructor(
        private readonly fileService: FilesServiceInterface,
        private readonly fileCacheManager: CacheManagerInterface
    ) {
        super();
        this.logs = Logger.instance;
        this.env = new Environment()
    }

    public ping = (_req: Request, res: Response): void => {
        try {
            this.logs.logInfo("controllers/ping", "Success");
            res.status(201).json({ message: "pong" });
        } catch (err) {
            this.logs.logError("controllers/ping", "Internal Server Error", (err as Error).message, 500)
            res.status(500).json(this.responseHandler.serverError())
        }
    };


    public getUserStorage = (req: Request, res: Response) => {
        try {
            const { username } = req.body;

            getMaxStorage(req.cookies.tkn).then(maxStorage => {
                getUsedStorage(username).then(usedStorage => {
                    res.status(200).json(this.responseHandler.response("Valid", { maxStorage: maxStorage, usedStorage: usedStorage }))
                })
            }).catch(_err => {
                res.status(400).json(this.responseHandler.throwError("Bad bad"))
            })

        } catch (error) {
            this.logs.logError("controllers/validate", "Internal Server Error", (error as Error).message, 500)
            res.status(500).json(this.responseHandler.serverError())
        }
    }

    public getFiles = async (req: Request, res: Response): Promise<void> => {
        try {
            const { hash } = req.query;
            if (!hash) throw Error();

            const fingerprint = hash.toString();

            const cacheFolder = await this.fileCacheManager.getFiles(fingerprint);

            if (cacheFolder.files.length > 0) {
                this.logs.logInfo("controllers/getFiles", `Path:${cacheFolder.path}`, 200);
                res.status(200).json(this.responseHandler.response("Success", { files: cacheFolder.files, path: cacheFolder.path }))
                
            } else {
                this.fileService.getFolderFiles(fingerprint).then(value => {

                    const files = getFileList(value.data?.files || [], `${req.protocol}://${req.get("host")}`)

                    if (files) this.fileCacheManager.save(fingerprint, files)

                    this.logs.logInfo("controllers/getFiles", `Success`, 200);
                    res.status(200).json(this.responseHandler.response(value.message, { files: files, path: value.data?.path }))

                }).catch((err: Error) => {
                    this.logs.logError("controllers/getFiles", "Internal Server Error", (err as Error).message, 500)
                    res.status(500).json(this.responseHandler.serverError())
                });
            }

        } catch (err) {
            this.logs.logError("controllers/getFiles", "Internal Server Error", (err as Error).message, 500)
            res.status(500).json(this.responseHandler.serverError())
        }
    }

    public getHome = (req: Request, res: Response): void => {
        try {
            const { username } = req.body;

            this.fileService.getCustom(username, "home").then(value => {
                const files = getFileList(value.data?.files || [], `${req.protocol}://${req.get("host")}`)

                this.logs.logInfo("controllers/getHome", `${value.message}`, 200, username);
                res.status(200).json(this.responseHandler.response(value.message, { files: files, fingerprint: value.data?.fingerprint }))

            }).catch((error: Error) => {
                this.logs.logError("controllers/getHome", "Internal Server Error", (error as Error).message, 500)
                res.status(500).json(this.responseHandler.serverError())
            });

        } catch (error) {
            this.logs.logError("controllers/getHome", "Internal Server Error", (error as Error).message, 500)
            res.status(500).json(this.responseHandler.serverError())
        }
    }


    public getShared = (req: Request, res: Response): void => {
        try {
            const { username, groups } = req.body;

            console.log("username:", username, "groups:", groups);

            this.fileService.getShared(username, groups).then(value => {
                const files = getFileList(value.data?.files || [], `${req.protocol}://${req.get("host")}`)

                this.logs.logInfo("controllers/getShared", `${value.message}`, 200, username);
                res.status(200).json(this.responseHandler.response(value.message, { files: files, fingerprint: value.data?.fingerprint }))

            }).catch((error: Error) => {
                this.logs.logError("controllers/getShared", "Internal Server Error", (error as Error).message, 500)
                res.status(500).json(this.responseHandler.serverError())
            });

        } catch (error) {
            this.logs.logError("controllers/getShared", "Internal Server Error", (error as Error).message, 500)
            res.status(500).json(this.responseHandler.serverError())
        }
    }

    public getImages = (req: Request, res: Response): void => {
        try {
            const { username } = req.body;

            console.log("username:", username);
            

            this.fileService.getAlbum(username).then(value => {
                const files = getFileList(value.data || [], `${req.protocol}://${req.get("host")}`)
                
                this.logs.logInfo("controllers/getImages", `${value.message}`, 200, username);
                res.status(200).json(this.responseHandler.response(value.message, files))

            }).catch((error: Error) => {
                this.logs.logError("controllers/getImages", "Internal Server Error", (error as Error).message, 500)
                res.status(500).json(this.responseHandler.serverError())
            });

        } catch (error) {
            this.logs.logError("controllers/getImages", "Internal Server Error", (error as Error).message, 500)
            res.status(500).json(this.responseHandler.serverError())
        }
    }

    public deleteFile = async (req: Request, res: Response): Promise<void> => {
        try {
            const { folderFingerprint, fingerprint } = req.body;

            this.fileService.deleteFile(fingerprint).then(value => {
                if (value.success) {
                    this.fileCacheManager.delete(folderFingerprint, fingerprint);

                    this.logs.logInfo("controllers/deleteFile", `${value.message}`, 200);
                    res.status(200).json(this.responseHandler.response(value.message));

                } else {
                    this.logs.logError("controllers/deleteFile", "Not Found?", value.message, 404)
                    res.status(404).json(this.responseHandler.response(value.message));
                }

            }).catch((error: Error) => {
                this.logs.logError("controllers/deleteFile", "Internal Server Error", (error as Error).message, 500)
                res.status(500).json(this.responseHandler.serverError())
            });

        } catch (error) {
            this.logs.logError("controllers/deleteFile", "Internal Server Error", (error as Error).message, 500)
            res.status(500).json(this.responseHandler.serverError())
        }
    }

    public renameFile = (req: Request, res: Response): void => {
        try {
            const { fingerprint, newName } = req.body;

            this.fileService.renameFile(fingerprint, newName).then(value => {

                this.logs.logInfo("controllers/renameFile", `${value.message}`, 200);
                res.status(200).json(this.responseHandler.response(value.message));

            }).catch((error: Error) => {
                this.logs.logError("controllers/renameFile", "Internal Server Error", (error as Error).message, 500)
                res.status(500).json(this.responseHandler.serverError())
            });

        } catch (error) {
            this.logs.logError("controllers/renameFile", "Internal Server Error", (error as Error).message, 500)
            res.status(500).json(this.responseHandler.serverError())
        }
    }

    public changePermissions = (req: Request, res: Response): void => {
        try {
            const { folder, fingerprint, permissions } = req.body;

            this.fileService.changePermissions(fingerprint, permissions).then(value => {
                
                this.logs.logInfo("controllers/changePermissions", `${value.message}`, 200);
                this.fileCacheManager.update(folder, fingerprint, permissions);
                
                res.status(200).json(this.responseHandler.response(value.message));

            }).catch(error => {
                this.logs.logError("controllers/changePermissions", "Internal Server Error", (error as Error).message, 500)
                res.status(500).json(this.responseHandler.serverError())
            });

        } catch (error) {
            this.logs.logError("controllers/changePermissions", "Internal Server Error", (error as Error).message, 500)
            res.status(500).json(this.responseHandler.serverError())
        }
    }


    public createFolder = async (req: Request, res: Response): Promise<void> => {
        try {
            const { folderFingerprint, name, username } = req.body;
            

            this.fileService.createFolder(folderFingerprint, name, username).then(value => {
                const createdFolder = value.data;
                
                if (!createdFolder) {
                    this.logs.logError("controllers/createFolder", "Bad Request", value.message, 400)
                    res.status(400).json(this.responseHandler.throwError(value.message));
                    return
                }

                const folder = GRPCfileToDomain(createdFolder, `${req.protocol}://${req.get("host")}`)

                this.fileCacheManager.saveOne(folderFingerprint, folder);

                this.logs.logInfo("controllers/createFolder", `${value.message}`, 200, username);
                res.status(201).json(this.responseHandler.response(value.message, folder));

            }).catch(error => {
                this.logs.logError("controllers/createFolder", "Internal Server Error", (error as Error).message, 500)
                res.status(500).json(this.responseHandler.serverError())
            });

        } catch (error) {
            this.logs.logError("controllers/createFolder", "Internal Server Error", (error as Error).message, 500)
            res.status(500).json(this.responseHandler.serverError())
        }
    }

    public save = async (req: Request, res: Response): Promise<void> => {
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
                        const savedFile = GRPCfileToDomain(file, `${req.protocol}://${req.get("host")}`)

                        this.fileCacheManager.saveOne(folderFingerprint, savedFile);

                        if(file.getMimetype() === "video/mp4"){
                            axios.post(
                                `${this.env.STREAMING_URI}/transcode`, 
                                {
                                    hash: file.getFingerprint()
                                },
                                {
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                }
                            )
                        }
                        
                        this.logs.logInfo("controllers/save", `File upload succesfully`, 200, username);
                        res.status(201).json(this.responseHandler.response("File upload succesfully", savedFile))
                        return
                    }

                    this.logs.logError("controllers/save", "Error al subir archivo", "Error al subir archivo",  400)
                    res.status(400).json(this.responseHandler.throwError("Error al subir archivo"))

                }).catch(error => {
                    this.logs.logError("controllers/save", "Internal Server Error", (error as Error).message, 500)
                    res.status(500).json(this.responseHandler.serverError())
                })

            } else {
                this.logs.logError("controllers/save", "Bad Request", "Check your request", 400)
                res.status(400).json(this.responseHandler.throwError("Check your request"))
            }

        } catch (error) {
            this.logs.logError("controllers/save", "Internal Server Error", (error as Error).message, 500);
            res.status(500).json(this.responseHandler.serverError());
        }
    }

    /**
     * Descarga un archivo dada una ruta relativa
     * @param req 
     * @param res 
     */
    public downloadFile = (req: Request, res: Response): void => {
        try {
            const { hash } = req.query;

            const downloadRequest = new DownloadRequest();
            downloadRequest.setFingerprint(hash?.toString() || '');

            res.setHeader('Content-Disposition', `attachment; filename="file"`);
            res.setHeader('Content-Type', 'application/octet-stream');

            const call = this.fileService.getClient().download(downloadRequest);

            call.on('data', (response: DownloadResponse) => {
                res.write(response.getChunk_asU8());
            });

            call.on('end', () => {
                this.logs.logInfo("controllers/downloadFile", `File download succesfully`, 200);
                res.end();
            });

            call.on('error', (error: Error) => {
                this.logs.logError("controllers/downloadFile", "Internal Server Error", (error as Error).message, 500)
                res.status(500).send('Error during file download.');
            });

        } catch (error) {
            this.logs.logError("controllers/downloadFile", "Internal Server Error", (error as Error).message, 500)
            res.status(500).json(this.responseHandler.serverError())
        }
    };

    public streaming = (req: Request, res: Response): void => {
        try {
            const { hash } = req.params;

            if (hash) {
                axios.get(`${this.env.STREAMING_URI}/uri/${hash}`).then(response => {
                    res.status(200).json({
                        uri: response.data.uri
                    })
                })
            }

        } catch (error) {
            res.status(500).json(this.responseHandler.serverError())
        }
    }
}