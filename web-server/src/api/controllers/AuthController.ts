import { Request, Response } from "express";
import Controller from "../../infrastructure/express/controller/Controller";
import { CredentialsManager } from "../../infrastructure/ldap/CredentialsManager";
import { TokenAuth } from "../../infrastructure/middleware/TokenAuth";
import { GrpcFileService } from "../../grpc/FileService";
import { Environment } from "../../environment/Environment";
import { Logger } from "../../util/Logger";

export class AuthController extends Controller {
    private readonly env: Environment;
    private readonly logs: Logger;

    constructor(
        private readonly credentialsManager: CredentialsManager,
        private readonly tokenManager: TokenAuth
    ) {
        super();
        this.env = new Environment();
        this.logs = Logger.instance;
    }

    public ping = (_req: Request, res: Response): void => {
        try {
            res.status(201).json({ message: "auth pong" });
        } catch (error) {
            res.status(500).json(this.responseHandler.serverError())
        }
    }

    public validate = (req: Request, res: Response) => {
        try {
            const { username, role } = req.body;

            this.logs.logInfo("controllers/validate", "Usuario autenticado con exito", 200, username)
            res.status(200).json(this.responseHandler.response("Valid", { username: username, role: role }))
        } catch (error) {
            this.logs.logError("controllers/validate", "Internal Server Error", (error as Error).message, 500)
            res.status(500).json(this.responseHandler.serverError())
        }
    }

    public login = (req: Request, res: Response) => {
        try {
            const { username, password } = req.body;

            this.credentialsManager.login(username, password).then(value => {

                if (value.code < 400 && value.token) {
                    this.tokenManager.generateToken(value.token, res)
                    this.logs.logInfo("controllers/login", "Usuario autenticado con exito", value.code, username)
                    res.status(value.code).json(this.responseHandler.response("usuario autenticado con exito"))
                    return
                }

                this.logs.logError("controllers/login", "Credenciales inválidas", username, value.code)
                res.status(value.code).json(this.responseHandler.throwError("Credenciales inválidas"))
            }).catch(error => {
                this.logs.logError("controllers/login", "Internal Server Error", (error as Error).message, 500)
                res.status(500).json(this.responseHandler.serverError())
            })

        } catch (error) {
            this.logs.logError("controllers/login", "Internal Server Error", (error as Error).message, 500)
            res.status(500).json(this.responseHandler.serverError())
        }
    }

    public logout = (req: Request, res: Response) => {
        try {
            const { username } = req.body
            this.tokenManager.deleteToken(res);

            this.logs.logInfo("controllers/logout", "Cookie elminada con exito", 200, username)
            res.status(200).json(this.responseHandler.response("Logout Succesfully"))
        } catch (error) {
            this.logs.logError("controllers/logout", "Internal Server Error", (error as Error).message, 500)
            res.status(500).json(this.responseHandler.serverError())
        }
    }

    public addToGroup = (req: Request, res: Response) => {
        try {
            const { username, user } = req.body
            this.tokenManager.deleteToken(res);

            const token = req.cookies.tkn;

            if (!token) {
                res.status(400).json(this.responseHandler.throwError("No token"))
                return
            }

            this.credentialsManager.addToGroup(token, username, user).then(value => {
                if (value != 200) {
                    this.logs.logError("controllers/changeGroup", "Internal Server Error", "error", 500)
                    res.status(400).json(this.responseHandler.throwError("An Error"))
                    return
                } else {
                    this.logs.logInfo("controllers/changeGroup", "OK", 200, username)
                    res.status(200).json(this.responseHandler.response("Group changed"))
                    return
                }
            }).catch(error => {
                this.logs.logError("controllers/changeGroup", "Internal Server Error", (error as Error).message, 500)
                res.status(500).json(this.responseHandler.serverError())
            })

        } catch (error) {
            this.logs.logError("controllers/changeGroup", "Internal Server Error", (error as Error).message, 500)
            res.status(500).json(this.responseHandler.serverError())
        }

    }

    public register = (req: Request, res: Response) => {
        try {
            const { username, name, lastname, email, password } = req.body;
            const fileService = new GrpcFileService();

            const token = req.cookies.tkn;

            if (!token) throw new Error("No token")

            this.credentialsManager.register(
                token,
                {
                    username: username,
                    name: name,
                    lastname: lastname,
                    email: email,
                    password: password
                }
            ).then(value => {
                if (value === 201) {
                    this.logs.logInfo("controllers/register", "Usuario registrado con exito", 201)
                    res.status(value).json(this.responseHandler.response("Usuario registrado con exito"))

                    fileService.createFolder(this.env.ROOT_DIR, username, username).then(folder => {
                        fileService.createFolder(folder.data?.getFingerprint() || "", "mpi", username)
                    })
                }

                else {
                    this.logs.logError("controllers/register", "Unauthorized", "Unauthorized", 401)
                    res.status(401).json(this.responseHandler.throwError("Unauthorized"))
                }
            }).catch(error => {
                this.logs.logError("controllers/register", "Internal Server Error", (error as Error).message, 500)
                res.status(500).json(this.responseHandler.serverError())
            })

        } catch (error) {
            this.logs.logError("controllers/register", "Internal Server Error", (error as Error).message, 500)
            res.status(500).json(this.responseHandler.serverError())
        }
    }
}