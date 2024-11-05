import { GRPCResponse } from "../../util/GRPCResponseManager"
import { FileResponse } from "../grpc/mpi/mpijobs_pb"

export interface MpiServiceInterface {
    ping(): void
    upload(buffer: Buffer, fileName: string, username: string): Promise<GRPCResponse<FileResponse>>    
}