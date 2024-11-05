import { FilesController } from "../../api/controllers/FilesController";
import { FilesRouter } from "../../api/routers/FilesRouter";
import ExpressRouter from "../../contracts/express/route/ExpressRouter";
import { FilesCacheManager } from "../cache/FilesCacheManager";
import { RedisDBC } from "../cache/RedisConnection";
import { GrpcFileService } from "../../grpc/FileService";
import { PermissionsValidator } from "../ldap/PermissionsManager";

export class FilesFactory {

    public static getRouter = (): ExpressRouter => {
        const redis = RedisDBC.getInstance()
        redis.connect();

        const filesCacheManager = new FilesCacheManager(redis);

        const filesService = new GrpcFileService();
        const permissionsManager = new PermissionsValidator()

        const controller = new FilesController(filesService, filesCacheManager);
        return new FilesRouter(controller, permissionsManager);
    }
}