"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const Controller_1 = __importDefault(require("../../infrastructure/express/controller/Controller"));
const FileService_1 = require("../../infrastructure/grpc/FileService");
const Environment_1 = require("../../environment/Environment");
const Logger_1 = require("../../util/Logger");
class AuthController extends Controller_1.default {
    credentialsManager;
    tokenManager;
    env;
    logs;
    constructor(credentialsManager, tokenManager) {
        super();
        this.credentialsManager = credentialsManager;
        this.tokenManager = tokenManager;
        this.env = new Environment_1.Environment();
        this.logs = Logger_1.Logger.instance;
    }
    ping = (_req, res) => {
        try {
            res.status(201).json({ message: "auth pong" });
        }
        catch (error) {
            res.status(500).json(this.responseHandler.serverError());
        }
    };
    validate = (req, res) => {
        try {
            const { username, role } = req.body;
            this.logs.logInfo("controllers/validate", "Usuario autenticado con exito", 200, username);
            res.status(200).json(this.responseHandler.response("Valid", { username: username, role: role }));
        }
        catch (error) {
            this.logs.logError("controllers/validate", "Internal Server Error", error.message, 500);
            res.status(500).json(this.responseHandler.serverError());
        }
    };
    login = (req, res) => {
        try {
            const { username, password } = req.body;
            this.credentialsManager.login(username, password).then(value => {
                if (value.code < 400 && value.token) {
                    this.tokenManager.generateToken(value.token, res);
                    this.logs.logInfo("controllers/login", "Usuario autenticado con exito", value.code, username);
                    res.status(value.code).json(this.responseHandler.response("usuario autenticado con exito"));
                    return;
                }
                this.logs.logError("controllers/login", "Credenciales inválidas", username, value.code);
                res.status(value.code).json(this.responseHandler.throwError("Credenciales inválidas"));
            }).catch(error => {
                this.logs.logError("controllers/login", "Internal Server Error", error.message, 500);
                res.status(500).json(this.responseHandler.serverError());
            });
        }
        catch (error) {
            this.logs.logError("controllers/login", "Internal Server Error", error.message, 500);
            res.status(500).json(this.responseHandler.serverError());
        }
    };
    logout = (req, res) => {
        try {
            const { username } = req.body;
            this.tokenManager.deleteToken(res);
            this.logs.logInfo("controllers/logout", "Cookie elminada con exito", 200, username);
            res.status(200).json(this.responseHandler.response("Logout Succesfully"));
        }
        catch (error) {
            this.logs.logError("controllers/logout", "Internal Server Error", error.message, 500);
            res.status(500).json(this.responseHandler.serverError());
        }
    };
    addToGroup = (req, res) => {
        try {
            const { username, user } = req.body;
            this.tokenManager.deleteToken(res);
            const token = req.cookies.tkn;
            if (!token) {
                res.status(400).json(this.responseHandler.throwError("No token"));
                return;
            }
            this.credentialsManager.addToGroup(token, username, user).then(value => {
                if (value != 200) {
                    this.logs.logError("controllers/changeGroup", "Internal Server Error", "error", 500);
                    res.status(400).json(this.responseHandler.throwError("An Error"));
                    return;
                }
                else {
                    this.logs.logInfo("controllers/changeGroup", "OK", 200, username);
                    res.status(200).json(this.responseHandler.response("Group changed"));
                    return;
                }
            }).catch(error => {
                this.logs.logError("controllers/changeGroup", "Internal Server Error", error.message, 500);
                res.status(500).json(this.responseHandler.serverError());
            });
        }
        catch (error) {
            this.logs.logError("controllers/changeGroup", "Internal Server Error", error.message, 500);
            res.status(500).json(this.responseHandler.serverError());
        }
    };
    register = (req, res) => {
        try {
            const { username, name, lastname, email, password } = req.body;
            const fileService = new FileService_1.GrpcFileService();
            const token = req.cookies.tkn;
            if (!token)
                throw new Error("No token");
            this.credentialsManager.register(token, {
                username: username,
                name: name,
                lastname: lastname,
                email: email,
                password: password
            }).then(value => {
                if (value === 201) {
                    this.logs.logInfo("controllers/register", "Usuario registrado con exito", 201);
                    res.status(value).json(this.responseHandler.response("Usuario registrado con exito"));
                    fileService.createFolder(this.env.ROOT_DIR, username, username).then(folder => {
                        fileService.createFolder(folder.data?.getFingerprint() || "", "mpi", username);
                    });
                }
                else {
                    this.logs.logError("controllers/register", "Unauthorized", "Unauthorized", 401);
                    res.status(401).json(this.responseHandler.throwError("Unauthorized"));
                }
            }).catch(error => {
                this.logs.logError("controllers/register", "Internal Server Error", error.message, 500);
                res.status(500).json(this.responseHandler.serverError());
            });
        }
        catch (error) {
            this.logs.logError("controllers/register", "Internal Server Error", error.message, 500);
            res.status(500).json(this.responseHandler.serverError());
        }
    };
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map