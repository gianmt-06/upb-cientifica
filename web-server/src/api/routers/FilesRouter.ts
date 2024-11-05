import { Router } from "express";
import ExpressRouter from "../../contracts/express/route/ExpressRouter";
import { FilesController } from "../controllers/FilesController";
import multer, { Multer } from "multer";
import { PermissionsValidator } from "../../infrastructure/ldap/PermissionsManager";
import { validateStorage } from "../../infrastructure/middleware/StorageManager";

export class FilesRouter implements ExpressRouter {
    router: Router;
    path: string;
    version: string;
    upload: Multer;

    constructor(
        private readonly filesController: FilesController,
        private readonly permissionsValidator: PermissionsValidator,
    ) {
        this.router = Router();
        this.path = '/files'
        this.version = 'v1.0';

        this.upload = multer({ storage: multer.memoryStorage() });
        this.setRoutes();

    }

    setRoutes = () => {
        this.router.get('/ping',
            this.filesController.ping.bind(this.filesController)
        );

        this.router.patch('/rename',
            this.permissionsValidator.haveWritePermissions,
            this.filesController.renameFile.bind(this.filesController)
        )

        this.router.patch('/chmod',
            this.permissionsValidator.haveWritePermissions,
            this.filesController.changePermissions.bind(this.filesController)
        )

        this.router.get('/download',
            this.permissionsValidator.haveReadPermissions,
            this.filesController.downloadFile.bind(this.filesController)
        );

        this.router.post('/upload',
            this.upload.single('file'),
            this.permissionsValidator.haveWritePermissions,
            validateStorage,
            this.filesController.save.bind(this.filesController)
        );

        this.router.delete('/delete',
            this.permissionsValidator.haveWritePermissions,
            this.filesController.deleteFile.bind(this.filesController)
        );

        this.router.post("/folder/create",
            this.permissionsValidator.haveWritePermissions,
            validateStorage,
            this.filesController.createFolder.bind(this.filesController)
        );

        //?page=1&limit=10&sortby="name"
        this.router.get('/folder',
            this.permissionsValidator.haveReadPermissions,
            this.filesController.getFiles.bind(this.filesController)
        );

        this.router.get('/album',
            this.permissionsValidator.requireToken, 
            this.filesController.getImages.bind(this.filesController)
        );

        this.router.get('/home',
            this.permissionsValidator.requireToken,
            this.filesController.getHome.bind(this.filesController)
        );

        this.router.get('/shared',
            this.permissionsValidator.getGroups,
            this.filesController.getShared.bind(this.filesController)
        );

        this.router.get('/image',
            this.permissionsValidator.haveReadPermissions,
            this.filesController.downloadFile.bind(this.filesController)
        );

        this.router.get('/storage', 
            this.permissionsValidator.requireToken,
            this.filesController.getUserStorage.bind(this.filesController)
        );

        this.router.get('/streaming/:hash', 
            this.permissionsValidator.haveReadPermissions,
            this.filesController.streaming.bind(this.filesController)
        );

    }
}