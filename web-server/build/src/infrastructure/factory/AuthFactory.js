"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthFactory = void 0;
const AuthController_1 = require("../../api/controllers/AuthController");
const AuthRouter_1 = require("../../api/routers/AuthRouter");
const CredentialsManager_1 = require("../ldap/CredentialsManager");
const PermissionsManager_1 = require("../ldap/PermissionsManager");
const TokenAuth_1 = require("../middleware/TokenAuth");
class AuthFactory {
    static getRouter = () => {
        const credentialsManager = new CredentialsManager_1.CredentialsManager();
        const permissionsManager = new PermissionsManager_1.PermissionsValidator();
        const tokenManager = new TokenAuth_1.TokenAuth();
        const controller = new AuthController_1.AuthController(credentialsManager, tokenManager);
        return new AuthRouter_1.AuthRouter(controller, permissionsManager);
    };
}
exports.AuthFactory = AuthFactory;
//# sourceMappingURL=AuthFactory.js.map