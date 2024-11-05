"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MpiFactory = void 0;
const MpiController_1 = require("../../api/controllers/MpiController");
const MpiRouter_1 = require("../../api/routers/MpiRouter");
const FileService_1 = require("../grpc/FileService");
const MPIService_1 = require("../grpc/services/MPIService");
const PermissionsManager_1 = require("../ldap/PermissionsManager");
class MpiFactory {
    static getRouter = () => {
        const permissionsManager = new PermissionsManager_1.PermissionsValidator();
        const mpiService = new MPIService_1.MPIService();
        const filesService = new FileService_1.GrpcFileService();
        const controller = new MpiController_1.MpiController(mpiService, filesService);
        return new MpiRouter_1.MpiRouter(controller, permissionsManager);
    };
}
exports.MpiFactory = MpiFactory;
//# sourceMappingURL=MpiFactory.js.map