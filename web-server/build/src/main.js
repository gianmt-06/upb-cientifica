"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Express_1 = __importDefault(require("./infrastructure/express/Express"));
const AuthFactory_1 = require("./infrastructure/factory/AuthFactory");
const FilesFactory_1 = require("./infrastructure/factory/FilesFactory");
const MpiFactory_1 = require("./infrastructure/factory/MpiFactory");
const TestFactory_1 = __importDefault(require("./infrastructure/factory/TestFactory"));
const testRouter = TestFactory_1.default.getRouter();
const filesRouter = FilesFactory_1.FilesFactory.getRouter();
const authRouter = AuthFactory_1.AuthFactory.getRouter();
const mpiRouter = MpiFactory_1.MpiFactory.getRouter();
const server = new Express_1.default([
    testRouter,
    authRouter,
    filesRouter,
    mpiRouter
]);
server.start();
//# sourceMappingURL=main.js.map