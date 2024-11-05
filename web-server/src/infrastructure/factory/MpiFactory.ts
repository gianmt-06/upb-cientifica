import { MpiController } from "../../api/controllers/MpiController";
import { MpiRouter } from "../../api/routers/MpiRouter";
import ExpressRouter from "../../contracts/express/route/ExpressRouter";
import { GrpcFileService } from "../grpc/FileService";
import { MPIService } from "../grpc/services/MPIService";
import { PermissionsValidator } from "../ldap/PermissionsManager";


export class MpiFactory {
    public static getRouter = (): ExpressRouter => {
        const permissionsManager = new PermissionsValidator()
        const mpiService = new MPIService();
        const filesService = new GrpcFileService();

        const controller = new MpiController(mpiService, filesService);
        return new MpiRouter(controller, permissionsManager);
    }
}