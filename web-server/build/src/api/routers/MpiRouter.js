"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MpiRouter = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
class MpiRouter {
    mpiController;
    permissionsValidator;
    router;
    path;
    version;
    upload;
    constructor(mpiController, permissionsValidator) {
        this.mpiController = mpiController;
        this.permissionsValidator = permissionsValidator;
        this.router = (0, express_1.Router)();
        this.path = '/mpi';
        this.version = 'v1.0';
        this.upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
        this.setRoutes();
    }
    setRoutes = () => {
        this.router.post('/upload', this.upload.single('file'), this.permissionsValidator.requireToken, this.mpiController.upload.bind(this.mpiController));
        this.router.get('/cluster', this.permissionsValidator.requireToken, this.mpiController.getCluster.bind(this.mpiController));
    };
}
exports.MpiRouter = MpiRouter;
//# sourceMappingURL=MpiRouter.js.map