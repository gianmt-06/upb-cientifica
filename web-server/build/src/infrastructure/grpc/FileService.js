"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrpcFileService = void 0;
// import protoLoader from "@grpc/proto-loader";
const grpc = __importStar(require("@grpc/grpc-js"));
// import path from "path";
const fileserver_pb_1 = require("../../contracts/grpc/fileserver_pb");
const fileserver_grpc_pb_1 = require("../../contracts/grpc/fileserver_grpc_pb");
const Environment_1 = require("../../environment/Environment");
class GrpcFileService {
    client;
    env;
    constructor() {
        this.env = new Environment_1.Environment;
        this.client = new fileserver_grpc_pb_1.FilesRouteClient(this.env.GRPC_URI, grpc.credentials.createInsecure());
        this.ping();
    }
    ping = () => {
        const req = new fileserver_pb_1.PingRequest();
        this.client.ping(req, (err, response) => {
            if (!err) {
                console.log("[FILES]", response.getMessage());
            }
            else {
                console.log(err);
            }
        });
    };
    getFolderFiles = async (folderFingerprint) => {
        const request = new fileserver_pb_1.GetAllFilesRequest();
        request.setFolderfingerprint(folderFingerprint);
        const getFilesPromise = new Promise((resolve, reject) => {
            this.client.getFolderFiles(request, (err, response) => {
                !err ? resolve(response) : reject(err);
            });
        });
        const response = await getFilesPromise;
        return {
            success: response.getResponse()?.getSucces() || false,
            message: response.getResponse()?.getMessage() || '',
            data: {
                files: response.getFilesList(),
                path: response.getFolderpath()
            }
        };
    };
    getCustom = async (user, folder) => {
        const request = new fileserver_pb_1.GetCustomFilesRequest();
        request.setUser(user);
        request.setFolder(folder);
        const getFilesPromise = new Promise((resolve, reject) => {
            this.client.getCustomFiles(request, (err, response) => {
                !err ? resolve(response) : reject(err);
            });
        });
        const response = await getFilesPromise;
        return {
            success: response.getResponse()?.getSucces() || false,
            message: response.getResponse()?.getMessage() || '',
            data: { files: response.getFilesList(), fingerprint: response.getFingerprint() }
        };
    };
    getShared = async (user, groups) => {
        const request = new fileserver_pb_1.GetSharedFilesRequest();
        request.setUsername(user);
        request.setGroupsList(groups);
        const getFilesPromise = new Promise((resolve, reject) => {
            this.client.getSharedFiles(request, (err, response) => {
                !err ? resolve(response) : reject(err);
            });
        });
        const response = await getFilesPromise;
        return {
            success: response.getResponse()?.getSucces() || false,
            message: response.getResponse()?.getMessage() || '',
            data: { files: response.getFilesList(), fingerprint: response.getFingerprint() }
        };
    };
    createFolder = async (folderFingerprint, folderName, username) => {
        const request = new fileserver_pb_1.CreateFolderRequest();
        request.setFolderfingerprint(folderFingerprint);
        request.setFoldername(folderName);
        request.setOwner(username);
        const getFilesPromise = new Promise((resolve, reject) => {
            this.client.createFolder(request, (err, response) => {
                !err ? resolve(response) : reject(err);
            });
        });
        const response = await getFilesPromise;
        return {
            success: response.getResponse()?.getSucces() || false,
            message: response.getResponse()?.getMessage() || '',
            data: response.getFolder()
        };
    };
    getProperties = (fileFingerprint) => {
        const request = new fileserver_pb_1.GetFileRequest();
        request.setFingerprint(fileFingerprint);
        this.client.getProperties(request, (err, response) => {
            if (!err) {
                console.log(response);
            }
            else {
                console.log(err);
            }
        });
    };
    deleteFile = async (fileFingerprint) => {
        const request = new fileserver_pb_1.DeleteFileRequest();
        request.setFingerprint(fileFingerprint);
        const getFilesPromise = new Promise((resolve, reject) => {
            this.client.deleteFile(request, (err, response) => {
                !err ? resolve(response) : reject(err);
            });
        });
        const response = await getFilesPromise;
        return {
            success: response.getResponse()?.getSucces() || false,
            message: response.getResponse()?.getMessage() || ''
        };
    };
    getHomeSize = async (user) => {
        const request = new fileserver_pb_1.GetHomeSizeRequest();
        request.setUser(user);
        const getStorageSize = new Promise((resolve, reject) => {
            this.client.getHomeSize(request, (err, response) => {
                !err ? resolve(response) : reject(err);
            });
        });
        const response = await getStorageSize;
        return {
            success: response.getSize() != 1 ? true : false,
            message: "",
            data: response.getSize(),
        };
    };
    renameFile = async (fileFingerprint, newName) => {
        const request = new fileserver_pb_1.RenameFileRequest();
        request.setFingerprint(fileFingerprint);
        request.setNewname(newName);
        const getFilesPromise = new Promise((resolve, reject) => {
            this.client.renameFile(request, (err, response) => {
                !err ? resolve(response) : reject(err);
            });
        });
        const response = await getFilesPromise;
        return {
            success: response.getResponse()?.getSucces() || false,
            message: response.getResponse()?.getMessage() || ''
        };
    };
    upload = (buffer, folderFingerprint, fileName, username) => {
        return new Promise((resolve, reject) => {
            try {
                const call = this.client.upload((error, response) => {
                    if (error) {
                        return reject(error);
                    }
                    console.log("archivo subido");
                    resolve(response);
                });
                const chunkSize = 1 * 1024 * 1024;
                let offset = 0;
                while (offset < buffer.length) {
                    const end = Math.min(offset + chunkSize, buffer.length);
                    const chunk = new Uint8Array(buffer).slice(offset, end);
                    const request = new fileserver_pb_1.FileUploadRequest();
                    request.setFilename(fileName);
                    request.setFolderfingerprint(folderFingerprint);
                    request.setChunk(chunk);
                    request.setUsername(username);
                    call.write(request);
                    offset = end;
                }
                call.end();
            }
            catch (error) {
                console.error('Error during gRPC upload:', error);
                reject(error);
            }
        });
    };
    getClient = () => {
        return this.client;
    };
    getAlbum = async (user) => {
        const request = new fileserver_pb_1.GetAllImagesRequest();
        request.setUser(user);
        const getFilesPromise = new Promise((resolve, reject) => {
            this.client.getAlbumFiles(request, (err, response) => {
                !err ? resolve(response) : reject(err);
            });
        });
        const response = await getFilesPromise;
        return {
            success: response.getResponse()?.getSucces() || false,
            message: response.getResponse()?.getMessage() || '',
            data: response.getFilesList()
        };
    };
    changePermissions = async (fingerprint, permissions) => {
        const request = new fileserver_pb_1.ChangePermissionsRequest();
        request.setFingerprint(fingerprint);
        request.setPermissions(permissions);
        const chmodResponse = new Promise((resolve, reject) => {
            this.client.chmodFile(request, (err, response) => {
                !err ? resolve(response) : reject(err);
            });
        });
        const response = await chmodResponse;
        return {
            success: response.getResponse()?.getSucces() || false,
            message: response.getResponse()?.getMessage() || ''
        };
    };
}
exports.GrpcFileService = GrpcFileService;
//# sourceMappingURL=FileService.js.map