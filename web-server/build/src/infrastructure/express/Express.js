"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const Logger_1 = require("../../util/Logger");
const Environment_1 = require("../../environment/Environment");
class Express {
    expressRouter;
    app;
    env;
    logger;
    constructor(expressRouter) {
        this.expressRouter = expressRouter;
        this.app = (0, express_1.default)();
        this.env = new Environment_1.Environment();
        this.logger = Logger_1.Logger.instance;
        this.config();
        this.routes();
    }
    getApp = () => {
        return this.app;
    };
    config = () => {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(body_parser_1.default.json());
        this.app.use((0, cookie_parser_1.default)());
        this.app.use((0, cors_1.default)({
            origin: this.env.WEBCLIENT_URI,
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['X-Requested-With', 'X-HTTP-Method-Override', 'Content-Type', 'Accept', 'resource-hash'],
            credentials: true
        }));
    };
    routes = () => {
        this.expressRouter.forEach(router => {
            this.app.use(router.path, router.router);
        });
    };
    start = () => {
        this.app.listen(this.env.SERVER_PORT, () => {
            this.logger.logInfo("express/start", `Server running on http://${this.env.SERVER_HOST}:${this.env.SERVER_PORT}`);
        });
    };
}
exports.default = Express;
//# sourceMappingURL=Express.js.map