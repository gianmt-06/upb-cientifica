// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var mpijobs_pb = require('./mpijobs_pb.js');

function serialize_FileRequest(arg) {
  if (!(arg instanceof mpijobs_pb.FileRequest)) {
    throw new Error('Expected argument of type FileRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_FileRequest(buffer_arg) {
  return mpijobs_pb.FileRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_FileResponse(arg) {
  if (!(arg instanceof mpijobs_pb.FileResponse)) {
    throw new Error('Expected argument of type FileResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_FileResponse(buffer_arg) {
  return mpijobs_pb.FileResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_PingRequest(arg) {
  if (!(arg instanceof mpijobs_pb.PingRequest)) {
    throw new Error('Expected argument of type PingRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_PingRequest(buffer_arg) {
  return mpijobs_pb.PingRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_PingResponse(arg) {
  if (!(arg instanceof mpijobs_pb.PingResponse)) {
    throw new Error('Expected argument of type PingResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_PingResponse(buffer_arg) {
  return mpijobs_pb.PingResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var FileServiceService = exports.FileServiceService = {
  processFile: {
    path: '/FileService/ProcessFile',
    requestStream: false,
    responseStream: false,
    requestType: mpijobs_pb.FileRequest,
    responseType: mpijobs_pb.FileResponse,
    requestSerialize: serialize_FileRequest,
    requestDeserialize: deserialize_FileRequest,
    responseSerialize: serialize_FileResponse,
    responseDeserialize: deserialize_FileResponse,
  },
  ping: {
    path: '/FileService/Ping',
    requestStream: false,
    responseStream: false,
    requestType: mpijobs_pb.PingRequest,
    responseType: mpijobs_pb.PingResponse,
    requestSerialize: serialize_PingRequest,
    requestDeserialize: deserialize_PingRequest,
    responseSerialize: serialize_PingResponse,
    responseDeserialize: deserialize_PingResponse,
  },
};

exports.FileServiceClient = grpc.makeGenericClientConstructor(FileServiceService);
