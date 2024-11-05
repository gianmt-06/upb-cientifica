// package: 
// file: mpijobs.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as mpijobs_pb from "./mpijobs_pb";

interface IFileServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    processFile: IFileServiceService_IProcessFile;
    ping: IFileServiceService_IPing;
}

interface IFileServiceService_IProcessFile extends grpc.MethodDefinition<mpijobs_pb.FileRequest, mpijobs_pb.FileResponse> {
    path: "/FileService/ProcessFile";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<mpijobs_pb.FileRequest>;
    requestDeserialize: grpc.deserialize<mpijobs_pb.FileRequest>;
    responseSerialize: grpc.serialize<mpijobs_pb.FileResponse>;
    responseDeserialize: grpc.deserialize<mpijobs_pb.FileResponse>;
}
interface IFileServiceService_IPing extends grpc.MethodDefinition<mpijobs_pb.PingRequest, mpijobs_pb.PingResponse> {
    path: "/FileService/Ping";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<mpijobs_pb.PingRequest>;
    requestDeserialize: grpc.deserialize<mpijobs_pb.PingRequest>;
    responseSerialize: grpc.serialize<mpijobs_pb.PingResponse>;
    responseDeserialize: grpc.deserialize<mpijobs_pb.PingResponse>;
}

export const FileServiceService: IFileServiceService;

export interface IFileServiceServer {
    processFile: grpc.handleUnaryCall<mpijobs_pb.FileRequest, mpijobs_pb.FileResponse>;
    ping: grpc.handleUnaryCall<mpijobs_pb.PingRequest, mpijobs_pb.PingResponse>;
}

export interface IFileServiceClient {
    processFile(request: mpijobs_pb.FileRequest, callback: (error: grpc.ServiceError | null, response: mpijobs_pb.FileResponse) => void): grpc.ClientUnaryCall;
    processFile(request: mpijobs_pb.FileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: mpijobs_pb.FileResponse) => void): grpc.ClientUnaryCall;
    processFile(request: mpijobs_pb.FileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: mpijobs_pb.FileResponse) => void): grpc.ClientUnaryCall;
    ping(request: mpijobs_pb.PingRequest, callback: (error: grpc.ServiceError | null, response: mpijobs_pb.PingResponse) => void): grpc.ClientUnaryCall;
    ping(request: mpijobs_pb.PingRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: mpijobs_pb.PingResponse) => void): grpc.ClientUnaryCall;
    ping(request: mpijobs_pb.PingRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: mpijobs_pb.PingResponse) => void): grpc.ClientUnaryCall;
}

export class FileServiceClient extends grpc.Client implements IFileServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public processFile(request: mpijobs_pb.FileRequest, callback: (error: grpc.ServiceError | null, response: mpijobs_pb.FileResponse) => void): grpc.ClientUnaryCall;
    public processFile(request: mpijobs_pb.FileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: mpijobs_pb.FileResponse) => void): grpc.ClientUnaryCall;
    public processFile(request: mpijobs_pb.FileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: mpijobs_pb.FileResponse) => void): grpc.ClientUnaryCall;
    public ping(request: mpijobs_pb.PingRequest, callback: (error: grpc.ServiceError | null, response: mpijobs_pb.PingResponse) => void): grpc.ClientUnaryCall;
    public ping(request: mpijobs_pb.PingRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: mpijobs_pb.PingResponse) => void): grpc.ClientUnaryCall;
    public ping(request: mpijobs_pb.PingRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: mpijobs_pb.PingResponse) => void): grpc.ClientUnaryCall;
}
