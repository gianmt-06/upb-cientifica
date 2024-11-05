"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = require("express");
class AuthRouter {
    authController;
    permissionsValidator;
    router;
    path;
    version;
    constructor(authController, permissionsValidator) {
        this.authController = authController;
        this.permissionsValidator = permissionsValidator;
        this.router = (0, express_1.Router)();
        this.path = '/auth';
        this.version = 'v1.0';
        this.setRoutes();
    }
    setRoutes = () => {
        this.router.get('/ping', this.authController.ping.bind(this.authController));
        this.router.post('/validate', this.permissionsValidator.requireToken, this.authController.validate.bind(this.authController));
        this.router.post('/group', this.permissionsValidator.requireToken, this.authController.addToGroup.bind(this.authController));
        this.router.post('/logout', this.permissionsValidator.requireToken, this.authController.logout.bind(this.authController));
        this.router.post('/login', this.authController.login.bind(this.authController));
        this.router.post('/register', this.authController.register.bind(this.authController));
    };
}
exports.AuthRouter = AuthRouter;
//# sourceMappingURL=AuthRouter.js.map