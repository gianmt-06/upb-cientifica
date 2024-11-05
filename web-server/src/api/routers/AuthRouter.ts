import { Router } from "express";
import ExpressRouter from "../../contracts/express/route/ExpressRouter";
import { AuthController } from "../controllers/AuthController";
import { PermissionsValidator } from "../../infrastructure/ldap/PermissionsManager";

export class AuthRouter implements ExpressRouter {
    router: Router;
    path: string;
    version: string;

    constructor(
        private readonly authController: AuthController,
        private readonly permissionsValidator: PermissionsValidator,
    ) {
        this.router = Router();
        this.path = '/auth'
        this.version = 'v1.0';

        this.setRoutes();
    }

    setRoutes = () => {
        this.router.get('/ping', this.authController.ping.bind(this.authController));
        
        this.router.post('/validate', 
            this.permissionsValidator.requireToken,
            this.authController.validate.bind(this.authController)
        );

        this.router.post('/group', this.permissionsValidator.requireToken, this.authController.addToGroup.bind(this.authController));
        this.router.post('/logout', this.permissionsValidator.requireToken, this.authController.logout.bind(this.authController))
        this.router.post('/login', this.authController.login.bind(this.authController));
        this.router.post('/register', this.authController.register.bind(this.authController));
    };
}