import { Router } from "express";
import ExpressRouter from "../../contracts/express/route/ExpressRouter";
import TestController from "../controllers/TestController";

export default class TestRouter implements ExpressRouter {
    router: Router;
    path: string;
    version: string;

    constructor (
        private readonly testController: TestController 
    ) {
        this.router = Router();
        this.path = '/test'
        this.version = 'v1.0'
        this.setRoutes();
    }

    setRoutes = () => {
        this.router.get('/health', this.testController.printHealth.bind(this.testController));   
    };
}