
import express, { Application } from 'express'
import cors from 'cors';
import ExpressRouter from '../../contracts/express/route/ExpressRouter';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { Logger } from '../../util/Logger';
import { Environment } from '../../environment/Environment';

export default class Express {
    private readonly app: Application
    private readonly env: Environment
    private readonly logger: Logger;

    constructor(
        private readonly expressRouter: ExpressRouter[]
    ) {
        this.app = express();
        this.env = new Environment();
        this.logger = Logger.instance;
        this.config();
        this.routes();
    }

    public getApp = (): Application => {
        return this.app;
    }

    config = (): void => {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(cookieParser()); 
        this.app.use(cors({
            origin: this.env.WEBCLIENT_URI,
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], 
            allowedHeaders: ['X-Requested-With', 'X-HTTP-Method-Override', 'Content-Type', 'Accept',  'resource-hash'],
            credentials: true 
        }));
    }

    routes = (): void => {
        this.expressRouter.forEach(router => {
            this.app.use(router.path, router.router);
        });
    }

    start = () => {
        this.app.listen(this.env.SERVER_PORT, () => {
            this.logger.logInfo("express/start", `Server running on http://${this.env.SERVER_HOST}:${this.env.SERVER_PORT}`)
        })
    }
}
