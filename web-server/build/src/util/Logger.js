"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const winston_1 = __importDefault(require("winston"));
const transports_1 = require("winston/lib/winston/transports");
class Logger {
    _logger;
    static Instance;
    constructor() {
        this._logger = winston_1.default.createLogger({
            level: 'info',
            format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.printf(({ timestamp, level, message }) => {
                return `${timestamp} [${level}]: ${message}`;
            })),
            transports: [
                new transports_1.Console(),
                new transports_1.File({ filename: 'logs/log.log' })
            ]
        });
    }
    static get instance() {
        if (!Logger.Instance) {
            Logger.Instance = new Logger();
        }
        return Logger.Instance;
    }
    get logger() {
        return this._logger;
    }
    logInfo(method, message, code, user) {
        let log = `method: ${method}, message: ${message},`;
        if (code)
            log += ` code: ${code}`;
        if (user)
            log += `, user: ${user}`;
        this.logger.info(log);
    }
    logError(method, message, error, code) {
        let log = `method: ${method}, message: ${message}, error: ${error},`;
        if (code)
            log += ` code: ${code}`;
        this.logger.error(log);
    }
}
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map