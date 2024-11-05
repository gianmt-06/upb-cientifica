"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MPIService = void 0;
const mpijobs_grpc_pb_1 = require("../../../contracts/grpc/mpi/mpijobs_grpc_pb");
const mpijobs_pb_1 = require("../../../contracts/grpc/mpi/mpijobs_pb");
const Environment_1 = require("../../../environment/Environment");
const grpc = __importStar(require("@grpc/grpc-js"));
class MPIService {
    client;
    env;
    constructor() {
        this.env = new Environment_1.Environment;
        this.client = new mpijobs_grpc_pb_1.FileServiceClient(this.env.MPI_URI, grpc.credentials.createInsecure());
        if (this.client) {
            this.ping();
        }
    }
    ping = () => {
        const req = new mpijobs_pb_1.PingRequest();
        this.client.ping(req, (err, response) => {
            if (!err) {
                console.log("[MPI]", response.getMessage());
            }
            else {
                console.log(err);
            }
        });
    };
    upload = async (buffer, fileName, username) => {
        const request = new mpijobs_pb_1.FileRequest();
        request.setFiledata(buffer);
        request.setFilename(fileName);
        request.setUid(username);
        const mpiResponse = new Promise((resolve, reject) => {
            this.client.processFile(request, (err, response) => {
                !err ? resolve(response) : reject(err);
            });
        });
        const response = await mpiResponse;
        return {
            success: response.getSuccess(),
            message: response.getMessage()
        };
    };
}
exports.MPIService = MPIService;
//# sourceMappingURL=MPIService.js.map