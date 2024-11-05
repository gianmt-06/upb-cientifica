"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesFactory = void 0;
const FilesController_1 = require("../../api/controllers/FilesController");
const FilesRouter_1 = require("../../api/routers/FilesRouter");
const FilesCacheManager_1 = require("../cache/FilesCacheManager");
const RedisConnection_1 = require("../cache/RedisConnection");
const FileService_1 = require("../grpc/FileService");
const PermissionsManager_1 = require("../ldap/PermissionsManager");
class FilesFactory {
    static getRouter = () => {
        const redis = RedisConnection_1.RedisDBC.getInstance();
        redis.connect();
        const filesCacheManager = new FilesCacheManager_1.FilesCacheManager(redis);
        const filesService = new FileService_1.GrpcFileService();
        const permissionsManager = new PermissionsManager_1.PermissionsValidator();
        const controller = new FilesController_1.FilesController(filesService, filesCacheManager);
        return new FilesRouter_1.FilesRouter(controller, permissionsManager);
    };
}
exports.FilesFactory = FilesFactory;
//# sourceMappingURL=FilesFactory.js.map