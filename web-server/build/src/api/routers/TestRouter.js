"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class TestRouter {
    testController;
    router;
    path;
    version;
    constructor(testController) {
        this.testController = testController;
        this.router = (0, express_1.Router)();
        this.path = '/test';
        this.version = 'v1.0';
        this.setRoutes();
    }
    setRoutes = () => {
        this.router.get('/health', this.testController.printHealth.bind(this.testController));
    };
}
exports.default = TestRouter;
//# sourceMappingURL=TestRouter.js.map