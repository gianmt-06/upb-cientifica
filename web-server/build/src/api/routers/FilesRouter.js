"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesRouter = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const StorageManager_1 = require("../../infrastructure/middleware/StorageManager");
class FilesRouter {
    filesController;
    permissionsValidator;
    router;
    path;
    version;
    upload;
    constructor(filesController, permissionsValidator) {
        this.filesController = filesController;
        this.permissionsValidator = permissionsValidator;
        this.router = (0, express_1.Router)();
        this.path = '/files';
        this.version = 'v1.0';
        this.upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
        this.setRoutes();
    }
    setRoutes = () => {
        this.router.get('/ping', this.filesController.ping.bind(this.filesController));
        this.router.patch('/rename', this.permissionsValidator.haveWritePermissions, this.filesController.renameFile.bind(this.filesController));
        this.router.patch('/chmod', this.permissionsValidator.haveWritePermissions, this.filesController.changePermissions.bind(this.filesController));
        this.router.get('/download', this.permissionsValidator.haveReadPermissions, this.filesController.downloadFile.bind(this.filesController));
        this.router.post('/upload', this.upload.single('file'), this.permissionsValidator.haveWritePermissions, StorageManager_1.validateStorage, this.filesController.save.bind(this.filesController));
        this.router.delete('/delete', this.permissionsValidator.haveWritePermissions, this.filesController.deleteFile.bind(this.filesController));
        this.router.post("/folder/create", this.permissionsValidator.haveWritePermissions, StorageManager_1.validateStorage, this.filesController.createFolder.bind(this.filesController));
        //?page=1&limit=10&sortby="name"
        this.router.get('/folder', this.permissionsValidator.haveReadPermissions, this.filesController.getFiles.bind(this.filesController));
        this.router.get('/album', this.permissionsValidator.requireToken, this.filesController.getImages.bind(this.filesController));
        this.router.get('/home', this.permissionsValidator.requireToken, this.filesController.getHome.bind(this.filesController));
        this.router.get('/shared', this.permissionsValidator.getGroups, this.filesController.getShared.bind(this.filesController));
        this.router.get('/image', this.permissionsValidator.haveReadPermissions, this.filesController.downloadFile.bind(this.filesController));
        this.router.get('/storage', this.permissionsValidator.requireToken, this.filesController.getUserStorage.bind(this.filesController));
    };
}
exports.FilesRouter = FilesRouter;
//# sourceMappingURL=FilesRouter.js.map