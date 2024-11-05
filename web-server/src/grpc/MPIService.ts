import { FileServiceClient } from "../contracts/grpc/mpi/mpijobs_grpc_pb";
import { FileRequest, FileResponse, PingRequest } from "../contracts/grpc/mpi/mpijobs_pb";
import { Environment } from "../environment/Environment";

import * as grpc from '@grpc/grpc-js';
import { GRPCResponse } from "../util/GRPCResponseManager";
import { MpiServiceInterface } from "../contracts/services/MpiServiceInterface";


export class MPIService implements MpiServiceInterface {
    private readonly client: FileServiceClient
    private readonly env: Environment;

    constructor(){
        this.env = new Environment;
        this.client = new FileServiceClient(this.env.MPI_URI, grpc.credentials.createInsecure())

        if (this.client) {
            this.ping();
        }
    }

    public ping = () => {
        const req = new PingRequest();
        this.client.ping(req, (err, response) => {
            if (!err) {
                console.log("[MPI]", response.getMessage());
            } else {
                console.log(err);
            }
        })
    }

    public upload = async (buffer: Buffer, fileName: string, username: string): Promise<GRPCResponse<FileResponse>> => {
        const request = new FileRequest();

        request.setFiledata(buffer);
        request.setFilename(fileName);
        request.setUid(username);

        const mpiResponse = new Promise<FileResponse>((resolve, reject) => {
            this.client.processFile(request, (err, response) => {
                !err ? resolve(response) : reject(err);
            })
        })

        const response = await mpiResponse;

        return {
            success: response.getSuccess(),
            message: response.getMessage()
        }   
    }
}