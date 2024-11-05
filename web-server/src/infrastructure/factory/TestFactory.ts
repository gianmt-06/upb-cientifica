import TestController from "../../api/controllers/TestController";
import TestRouter from "../../api/routers/TestRouter";
import ExpressRouter from "../../contracts/express/route/ExpressRouter";

export default class TestFactory {

    public static getRouter = (): ExpressRouter => {
        const controller = new TestController();
        return new TestRouter(controller);
    }
}