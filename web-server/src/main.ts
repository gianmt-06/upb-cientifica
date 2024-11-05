import Express from "./infrastructure/express/Express";
import { AuthFactory } from "./infrastructure/factory/AuthFactory";
import { FilesFactory } from "./infrastructure/factory/FilesFactory";
import { MpiFactory } from "./infrastructure/factory/MpiFactory";
import TestFactory from "./infrastructure/factory/TestFactory";

const testRouter = TestFactory.getRouter();
const filesRouter = FilesFactory.getRouter();
const authRouter = AuthFactory.getRouter();
const mpiRouter = MpiFactory.getRouter();

const server = new Express([
    testRouter,
    authRouter,
    filesRouter,
    mpiRouter
])

server.start();