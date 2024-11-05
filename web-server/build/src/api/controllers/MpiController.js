"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MpiController = void 0;
const Controller_1 = __importDefault(require("../../infrastructure/express/controller/Controller"));
const Logger_1 = require("../../util/Logger");
const FilesDataMapper_1 = require("../../infrastructure/dataMapper/FilesDataMapper");
class MpiController extends Controller_1.default {
    mpiService;
    fileService;
    logs;
    constructor(mpiService, fileService) {
        super();
        this.mpiService = mpiService;
        this.fileService = fileService;
        this.logs = Logger_1.Logger.instance;
    }
    getCluster = (req, res) => {
        try {
            const { username } = req.body;
            console.log("clusterr");
            this.fileService.getCustom(username, "mpi").then(value => {
                const files = (0, FilesDataMapper_1.getFileList)(value.data?.files || [], `${req.protocol}://${req.get("host")}`);
                this.logs.logInfo("controllers/getCluster", `${value.message}`, 200, username);
                res.status(200).json(this.responseHandler.response(value.message, { files: files, fingerprint: value.data?.fingerprint }));
            }).catch((error) => {
                this.logs.logError("controllers/getCluster", "Internal Server Error", error.message, 500);
                res.status(500).json(this.responseHandler.serverError());
            });
        }
        catch (error) {
            this.logs.logError("controllers/getCluster", "Internal Server Error", error.message, 500);
            res.status(500).json(this.responseHandler.serverError());
        }
    };
    upload = async (req, res) => {
        const { username } = req.body;
        if (req.file && username) {
            const buffer = req.file.buffer;
            const fileName = req.file.originalname;
            this.mpiService.upload(buffer, fileName, username).then(response => {
                if (response.success) {
                    this.logs.logInfo("controllers/uploadJob", "Job upload", 200, username);
                    res.status(200).json(this.responseHandler.response(response.message));
                }
                else {
                    this.logs.logError("controllers/uploadJob", "Job not upload", username, 400);
                    res.status(400).json(this.responseHandler.throwError(response.message));
                }
                return;
            }).catch(_err => {
                this.logs.logError("controllers/uploadJob", "Server error", username, 500);
                res.status(500).json(this.responseHandler.serverError());
                return;
            });
        }
        else {
            this.logs.logError("controllers/uploadJob", "Bad Request", username, 400);
            res.status(400).json(this.responseHandler.throwError("No pai"));
        }
    };
}
exports.MpiController = MpiController;
//# sourceMappingURL=MpiController.js.map