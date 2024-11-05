// package: 
// file: mpijobs.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class FileRequest extends jspb.Message { 
    getFilename(): string;
    setFilename(value: string): FileRequest;
    getFiledata(): Uint8Array | string;
    getFiledata_asU8(): Uint8Array;
    getFiledata_asB64(): string;
    setFiledata(value: Uint8Array | string): FileRequest;
    getUid(): string;
    setUid(value: string): FileRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FileRequest.AsObject;
    static toObject(includeInstance: boolean, msg: FileRequest): FileRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FileRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FileRequest;
    static deserializeBinaryFromReader(message: FileRequest, reader: jspb.BinaryReader): FileRequest;
}

export namespace FileRequest {
    export type AsObject = {
        filename: string,
        filedata: Uint8Array | string,
        uid: string,
    }
}

export class FileResponse extends jspb.Message { 
    getMessage(): string;
    setMessage(value: string): FileResponse;
    getSuccess(): boolean;
    setSuccess(value: boolean): FileResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FileResponse.AsObject;
    static toObject(includeInstance: boolean, msg: FileResponse): FileResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FileResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FileResponse;
    static deserializeBinaryFromReader(message: FileResponse, reader: jspb.BinaryReader): FileResponse;
}

export namespace FileResponse {
    export type AsObject = {
        message: string,
        success: boolean,
    }
}

export class PingRequest extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PingRequest.AsObject;
    static toObject(includeInstance: boolean, msg: PingRequest): PingRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PingRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PingRequest;
    static deserializeBinaryFromReader(message: PingRequest, reader: jspb.BinaryReader): PingRequest;
}

export namespace PingRequest {
    export type AsObject = {
    }
}

export class PingResponse extends jspb.Message { 
    getMessage(): string;
    setMessage(value: string): PingResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PingResponse.AsObject;
    static toObject(includeInstance: boolean, msg: PingResponse): PingResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PingResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PingResponse;
    static deserializeBinaryFromReader(message: PingResponse, reader: jspb.BinaryReader): PingResponse;
}

export namespace PingResponse {
    export type AsObject = {
        message: string,
    }
}
