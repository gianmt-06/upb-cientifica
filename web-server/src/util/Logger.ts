import winston from "winston";
import { Console, File } from "winston/lib/winston/transports";

export class Logger {
    private readonly _logger;
    static Instance: Logger;

    private constructor() {
        this._logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.printf(({ timestamp, level, message }) => {
                    return `${timestamp} [${level}]: ${message}`;
                })
            ),
            transports: [
                new Console(),
                new File({ filename: 'logs/log.log' })
            ]
        })
    }

    public static get instance(): Logger {
        if (!Logger.Instance) {
            Logger.Instance = new Logger();
        }

        return Logger.Instance;
    }

    public get logger() {
        return this._logger;
    }

    public logInfo(method: string, message: string, code?: number, user?: string) {
        let log = `method: ${method}, message: ${message},`
        if (code) log += ` code: ${code}`
        if (user) log += `, user: ${user}`

        this.logger.info(log);
    }

    public logError(method: string, message: string, error: string, code?: number) {
        let log = `method: ${method}, message: ${message}, error: ${error},`
        if (code) log += ` code: ${code}`

        this.logger.error(log);
    }
}