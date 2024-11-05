import { Router } from "express";
import { MpiController } from "../controllers/MpiController";
import multer, { Multer } from "multer";
import ExpressRouter from "../../contracts/express/route/ExpressRouter";
import { PermissionsValidator } from "../../infrastructure/ldap/PermissionsManager";

export class MpiRouter implements ExpressRouter {
    router: Router;
    path: string;
    version: string;
    upload: Multer;

    constructor (
        private readonly mpiController: MpiController,
        private readonly permissionsValidator: PermissionsValidator,
    ) {
        this.router = Router();
        this.path = '/mpi'
        this.version = 'v1.0'
        this.upload = multer({ storage: multer.memoryStorage() });
        this.setRoutes();
    }

    setRoutes = () => {
        this.router.post(
            '/upload', 
            this.upload.single('file'),
            this.permissionsValidator.requireToken,
            this.mpiController.upload.bind(this.mpiController)
        );
        
        this.router.get(
            '/cluster',
            this.permissionsValidator.requireToken,
            this.mpiController.getCluster.bind(this.mpiController)
        )
    };
}