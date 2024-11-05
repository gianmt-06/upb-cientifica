import { Request, Response } from "express";
import Controller from "../../infrastructure/express/controller/Controller";
import { MPIService } from "../../infrastructure/grpc/services/MPIService";
import { Logger } from "../../util/Logger";
import { GrpcFileService } from "../../infrastructure/grpc/FileService";
import { getFileList } from "../../infrastructure/dataMapper/FilesDataMapper";

export class MpiController extends Controller {
    private logs: Logger;

    constructor(
        private readonly mpiService: MPIService,
        private readonly fileService: GrpcFileService
    ) {
        super()
        this.logs = Logger.instance;
    }

    public getCluster = (req: Request, res: Response): void => {
        try {
            const { username } = req.body;            

            this.fileService.getCustom(username, "mpi").then(value => {
                const files = getFileList(value.data?.files || [], `${req.protocol}://${req.get("host")}`)

                this.logs.logInfo("controllers/getCluster", `${value.message}`, 200, username);
                res.status(200).json(this.responseHandler.response(value.message, { files: files, fingerprint: value.data?.fingerprint }))

            }).catch((error: Error) => {
                this.logs.logError("controllers/getCluster", "Internal Server Error", (error as Error).message, 500)
                res.status(500).json(this.responseHandler.serverError())
            });

        } catch (error) {
            this.logs.logError("controllers/getCluster", "Internal Server Error", (error as Error).message, 500)
            res.status(500).json(this.responseHandler.serverError())
        }
    }

    public upload = async (req: Request, res: Response): Promise<void> => {
        const { username } = req.body;

        if (req.file && username) {
            const buffer = req.file.buffer;
            const fileName = req.file.originalname;

            this.mpiService.upload(buffer, fileName, username).then(response => {

                if (response.success) {
                    this.logs.logInfo("controllers/uploadJob", "Job upload", 200, username)
                    res.status(200).json(this.responseHandler.response(response.message));
                } else {
                    this.logs.logError("controllers/uploadJob", "Job not upload", username, 400)
                    res.status(400).json(this.responseHandler.throwError(response.message));
                }
                return
            }).catch(_err => {
                this.logs.logError("controllers/uploadJob", "Server error", username, 500)
                res.status(500).json(this.responseHandler.serverError());
                return
            })
        } else {
            this.logs.logError("controllers/uploadJob", "Bad Request", username, 400)
            res.status(400).json(this.responseHandler.throwError("No pai"))
        }
    }
}