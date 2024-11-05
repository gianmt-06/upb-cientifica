import { AuthController } from "../../api/controllers/AuthController";
import { AuthRouter } from "../../api/routers/AuthRouter";
import ExpressRouter from "../../contracts/express/route/ExpressRouter";
import { CredentialsManager } from "../ldap/CredentialsManager";
import { PermissionsValidator } from "../ldap/PermissionsManager";
import { TokenAuth } from "../middleware/TokenAuth";

export class AuthFactory {
    public static getRouter = (): ExpressRouter => {
        const credentialsManager = new CredentialsManager()
        const permissionsManager = new PermissionsValidator()

        const tokenManager = new TokenAuth()
        const controller = new AuthController(credentialsManager, tokenManager);
        return new AuthRouter(controller, permissionsManager);
    }
}