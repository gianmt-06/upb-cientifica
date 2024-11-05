// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var fileserver_pb = require('./fileserver_pb.js');

function serialize_pb_ChangePermissionsRequest(arg) {
  if (!(arg instanceof fileserver_pb.ChangePermissionsRequest)) {
    throw new Error('Expected argument of type pb.ChangePermissionsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_ChangePermissionsRequest(buffer_arg) {
  return fileserver_pb.ChangePermissionsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_ChangePermissionsResponse(arg) {
  if (!(arg instanceof fileserver_pb.ChangePermissionsResponse)) {
    throw new Error('Expected argument of type pb.ChangePermissionsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_ChangePermissionsResponse(buffer_arg) {
  return fileserver_pb.ChangePermissionsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_CreateFolderRequest(arg) {
  if (!(arg instanceof fileserver_pb.CreateFolderRequest)) {
    throw new Error('Expected argument of type pb.CreateFolderRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_CreateFolderRequest(buffer_arg) {
  return fileserver_pb.CreateFolderRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_CreateFolderResponse(arg) {
  if (!(arg instanceof fileserver_pb.CreateFolderResponse)) {
    throw new Error('Expected argument of type pb.CreateFolderResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_CreateFolderResponse(buffer_arg) {
  return fileserver_pb.CreateFolderResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_DeleteFileRequest(arg) {
  if (!(arg instanceof fileserver_pb.DeleteFileRequest)) {
    throw new Error('Expected argument of type pb.DeleteFileRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_DeleteFileRequest(buffer_arg) {
  return fileserver_pb.DeleteFileRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_DeleteFileResponse(arg) {
  if (!(arg instanceof fileserver_pb.DeleteFileResponse)) {
    throw new Error('Expected argument of type pb.DeleteFileResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_DeleteFileResponse(buffer_arg) {
  return fileserver_pb.DeleteFileResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_DownloadRequest(arg) {
  if (!(arg instanceof fileserver_pb.DownloadRequest)) {
    throw new Error('Expected argument of type pb.DownloadRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_DownloadRequest(buffer_arg) {
  return fileserver_pb.DownloadRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_DownloadResponse(arg) {
  if (!(arg instanceof fileserver_pb.DownloadResponse)) {
    throw new Error('Expected argument of type pb.DownloadResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_DownloadResponse(buffer_arg) {
  return fileserver_pb.DownloadResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_FileUploadRequest(arg) {
  if (!(arg instanceof fileserver_pb.FileUploadRequest)) {
    throw new Error('Expected argument of type pb.FileUploadRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_FileUploadRequest(buffer_arg) {
  return fileserver_pb.FileUploadRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_FileUploadResponse(arg) {
  if (!(arg instanceof fileserver_pb.FileUploadResponse)) {
    throw new Error('Expected argument of type pb.FileUploadResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_FileUploadResponse(buffer_arg) {
  return fileserver_pb.FileUploadResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_GetAllFilesRequest(arg) {
  if (!(arg instanceof fileserver_pb.GetAllFilesRequest)) {
    throw new Error('Expected argument of type pb.GetAllFilesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_GetAllFilesRequest(buffer_arg) {
  return fileserver_pb.GetAllFilesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_GetAllFilesResponse(arg) {
  if (!(arg instanceof fileserver_pb.GetAllFilesResponse)) {
    throw new Error('Expected argument of type pb.GetAllFilesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_GetAllFilesResponse(buffer_arg) {
  return fileserver_pb.GetAllFilesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_GetAllImagesRequest(arg) {
  if (!(arg instanceof fileserver_pb.GetAllImagesRequest)) {
    throw new Error('Expected argument of type pb.GetAllImagesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_GetAllImagesRequest(buffer_arg) {
  return fileserver_pb.GetAllImagesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_GetAllImagesResponse(arg) {
  if (!(arg instanceof fileserver_pb.GetAllImagesResponse)) {
    throw new Error('Expected argument of type pb.GetAllImagesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_GetAllImagesResponse(buffer_arg) {
  return fileserver_pb.GetAllImagesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_GetCustomFilesRequest(arg) {
  if (!(arg instanceof fileserver_pb.GetCustomFilesRequest)) {
    throw new Error('Expected argument of type pb.GetCustomFilesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_GetCustomFilesRequest(buffer_arg) {
  return fileserver_pb.GetCustomFilesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_GetCustomFilesResponse(arg) {
  if (!(arg instanceof fileserver_pb.GetCustomFilesResponse)) {
    throw new Error('Expected argument of type pb.GetCustomFilesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_GetCustomFilesResponse(buffer_arg) {
  return fileserver_pb.GetCustomFilesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_GetFileRequest(arg) {
  if (!(arg instanceof fileserver_pb.GetFileRequest)) {
    throw new Error('Expected argument of type pb.GetFileRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_GetFileRequest(buffer_arg) {
  return fileserver_pb.GetFileRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_GetFileResponse(arg) {
  if (!(arg instanceof fileserver_pb.GetFileResponse)) {
    throw new Error('Expected argument of type pb.GetFileResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_GetFileResponse(buffer_arg) {
  return fileserver_pb.GetFileResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_GetHomeSizeRequest(arg) {
  if (!(arg instanceof fileserver_pb.GetHomeSizeRequest)) {
    throw new Error('Expected argument of type pb.GetHomeSizeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_GetHomeSizeRequest(buffer_arg) {
  return fileserver_pb.GetHomeSizeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_GetHomeSizeResponse(arg) {
  if (!(arg instanceof fileserver_pb.GetHomeSizeResponse)) {
    throw new Error('Expected argument of type pb.GetHomeSizeResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_GetHomeSizeResponse(buffer_arg) {
  return fileserver_pb.GetHomeSizeResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_GetSharedFilesRequest(arg) {
  if (!(arg instanceof fileserver_pb.GetSharedFilesRequest)) {
    throw new Error('Expected argument of type pb.GetSharedFilesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_GetSharedFilesRequest(buffer_arg) {
  return fileserver_pb.GetSharedFilesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_GetSharedFilesResponse(arg) {
  if (!(arg instanceof fileserver_pb.GetSharedFilesResponse)) {
    throw new Error('Expected argument of type pb.GetSharedFilesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_GetSharedFilesResponse(buffer_arg) {
  return fileserver_pb.GetSharedFilesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_MoveFileRequest(arg) {
  if (!(arg instanceof fileserver_pb.MoveFileRequest)) {
    throw new Error('Expected argument of type pb.MoveFileRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_MoveFileRequest(buffer_arg) {
  return fileserver_pb.MoveFileRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_MoveFileResponse(arg) {
  if (!(arg instanceof fileserver_pb.MoveFileResponse)) {
    throw new Error('Expected argument of type pb.MoveFileResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_MoveFileResponse(buffer_arg) {
  return fileserver_pb.MoveFileResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_PingReply(arg) {
  if (!(arg instanceof fileserver_pb.PingReply)) {
    throw new Error('Expected argument of type pb.PingReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_PingReply(buffer_arg) {
  return fileserver_pb.PingReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_PingRequest(arg) {
  if (!(arg instanceof fileserver_pb.PingRequest)) {
    throw new Error('Expected argument of type pb.PingRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_PingRequest(buffer_arg) {
  return fileserver_pb.PingRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_RenameFileRequest(arg) {
  if (!(arg instanceof fileserver_pb.RenameFileRequest)) {
    throw new Error('Expected argument of type pb.RenameFileRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_RenameFileRequest(buffer_arg) {
  return fileserver_pb.RenameFileRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_RenameFileResponse(arg) {
  if (!(arg instanceof fileserver_pb.RenameFileResponse)) {
    throw new Error('Expected argument of type pb.RenameFileResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_RenameFileResponse(buffer_arg) {
  return fileserver_pb.RenameFileResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var FilesRouteService = exports.FilesRouteService = {
  ping: {
    path: '/pb.FilesRoute/Ping',
    requestStream: false,
    responseStream: false,
    requestType: fileserver_pb.PingRequest,
    responseType: fileserver_pb.PingReply,
    requestSerialize: serialize_pb_PingRequest,
    requestDeserialize: deserialize_pb_PingRequest,
    responseSerialize: serialize_pb_PingReply,
    responseDeserialize: deserialize_pb_PingReply,
  },
  createFolder: {
    path: '/pb.FilesRoute/CreateFolder',
    requestStream: false,
    responseStream: false,
    requestType: fileserver_pb.CreateFolderRequest,
    responseType: fileserver_pb.CreateFolderResponse,
    requestSerialize: serialize_pb_CreateFolderRequest,
    requestDeserialize: deserialize_pb_CreateFolderRequest,
    responseSerialize: serialize_pb_CreateFolderResponse,
    responseDeserialize: deserialize_pb_CreateFolderResponse,
  },
  getProperties: {
    path: '/pb.FilesRoute/GetProperties',
    requestStream: false,
    responseStream: false,
    requestType: fileserver_pb.GetFileRequest,
    responseType: fileserver_pb.GetFileResponse,
    requestSerialize: serialize_pb_GetFileRequest,
    requestDeserialize: deserialize_pb_GetFileRequest,
    responseSerialize: serialize_pb_GetFileResponse,
    responseDeserialize: deserialize_pb_GetFileResponse,
  },
  deleteFile: {
    path: '/pb.FilesRoute/DeleteFile',
    requestStream: false,
    responseStream: false,
    requestType: fileserver_pb.DeleteFileRequest,
    responseType: fileserver_pb.DeleteFileResponse,
    requestSerialize: serialize_pb_DeleteFileRequest,
    requestDeserialize: deserialize_pb_DeleteFileRequest,
    responseSerialize: serialize_pb_DeleteFileResponse,
    responseDeserialize: deserialize_pb_DeleteFileResponse,
  },
  renameFile: {
    path: '/pb.FilesRoute/RenameFile',
    requestStream: false,
    responseStream: false,
    requestType: fileserver_pb.RenameFileRequest,
    responseType: fileserver_pb.RenameFileResponse,
    requestSerialize: serialize_pb_RenameFileRequest,
    requestDeserialize: deserialize_pb_RenameFileRequest,
    responseSerialize: serialize_pb_RenameFileResponse,
    responseDeserialize: deserialize_pb_RenameFileResponse,
  },
  getFolderFiles: {
    path: '/pb.FilesRoute/GetFolderFiles',
    requestStream: false,
    responseStream: false,
    requestType: fileserver_pb.GetAllFilesRequest,
    responseType: fileserver_pb.GetAllFilesResponse,
    requestSerialize: serialize_pb_GetAllFilesRequest,
    requestDeserialize: deserialize_pb_GetAllFilesRequest,
    responseSerialize: serialize_pb_GetAllFilesResponse,
    responseDeserialize: deserialize_pb_GetAllFilesResponse,
  },
  getSharedFiles: {
    path: '/pb.FilesRoute/GetSharedFiles',
    requestStream: false,
    responseStream: false,
    requestType: fileserver_pb.GetSharedFilesRequest,
    responseType: fileserver_pb.GetSharedFilesResponse,
    requestSerialize: serialize_pb_GetSharedFilesRequest,
    requestDeserialize: deserialize_pb_GetSharedFilesRequest,
    responseSerialize: serialize_pb_GetSharedFilesResponse,
    responseDeserialize: deserialize_pb_GetSharedFilesResponse,
  },
  getCustomFiles: {
    path: '/pb.FilesRoute/GetCustomFiles',
    requestStream: false,
    responseStream: false,
    requestType: fileserver_pb.GetCustomFilesRequest,
    responseType: fileserver_pb.GetCustomFilesResponse,
    requestSerialize: serialize_pb_GetCustomFilesRequest,
    requestDeserialize: deserialize_pb_GetCustomFilesRequest,
    responseSerialize: serialize_pb_GetCustomFilesResponse,
    responseDeserialize: deserialize_pb_GetCustomFilesResponse,
  },
  getHomeSize: {
    path: '/pb.FilesRoute/GetHomeSize',
    requestStream: false,
    responseStream: false,
    requestType: fileserver_pb.GetHomeSizeRequest,
    responseType: fileserver_pb.GetHomeSizeResponse,
    requestSerialize: serialize_pb_GetHomeSizeRequest,
    requestDeserialize: deserialize_pb_GetHomeSizeRequest,
    responseSerialize: serialize_pb_GetHomeSizeResponse,
    responseDeserialize: deserialize_pb_GetHomeSizeResponse,
  },
  getAlbumFiles: {
    path: '/pb.FilesRoute/GetAlbumFiles',
    requestStream: false,
    responseStream: false,
    requestType: fileserver_pb.GetAllImagesRequest,
    responseType: fileserver_pb.GetAllImagesResponse,
    requestSerialize: serialize_pb_GetAllImagesRequest,
    requestDeserialize: deserialize_pb_GetAllImagesRequest,
    responseSerialize: serialize_pb_GetAllImagesResponse,
    responseDeserialize: deserialize_pb_GetAllImagesResponse,
  },
  getStreamingFiles: {
    path: '/pb.FilesRoute/GetStreamingFiles',
    requestStream: false,
    responseStream: false,
    requestType: fileserver_pb.GetAllImagesRequest,
    responseType: fileserver_pb.GetAllImagesResponse,
    requestSerialize: serialize_pb_GetAllImagesRequest,
    requestDeserialize: deserialize_pb_GetAllImagesRequest,
    responseSerialize: serialize_pb_GetAllImagesResponse,
    responseDeserialize: deserialize_pb_GetAllImagesResponse,
  },
  upload: {
    path: '/pb.FilesRoute/Upload',
    requestStream: true,
    responseStream: false,
    requestType: fileserver_pb.FileUploadRequest,
    responseType: fileserver_pb.FileUploadResponse,
    requestSerialize: serialize_pb_FileUploadRequest,
    requestDeserialize: deserialize_pb_FileUploadRequest,
    responseSerialize: serialize_pb_FileUploadResponse,
    responseDeserialize: deserialize_pb_FileUploadResponse,
  },
  download: {
    path: '/pb.FilesRoute/Download',
    requestStream: false,
    responseStream: true,
    requestType: fileserver_pb.DownloadRequest,
    responseType: fileserver_pb.DownloadResponse,
    requestSerialize: serialize_pb_DownloadRequest,
    requestDeserialize: deserialize_pb_DownloadRequest,
    responseSerialize: serialize_pb_DownloadResponse,
    responseDeserialize: deserialize_pb_DownloadResponse,
  },
  chmodFile: {
    path: '/pb.FilesRoute/ChmodFile',
    requestStream: false,
    responseStream: false,
    requestType: fileserver_pb.ChangePermissionsRequest,
    responseType: fileserver_pb.ChangePermissionsResponse,
    requestSerialize: serialize_pb_ChangePermissionsRequest,
    requestDeserialize: deserialize_pb_ChangePermissionsRequest,
    responseSerialize: serialize_pb_ChangePermissionsResponse,
    responseDeserialize: deserialize_pb_ChangePermissionsResponse,
  },
  moveFile: {
    path: '/pb.FilesRoute/MoveFile',
    requestStream: false,
    responseStream: false,
    requestType: fileserver_pb.MoveFileRequest,
    responseType: fileserver_pb.MoveFileResponse,
    requestSerialize: serialize_pb_MoveFileRequest,
    requestDeserialize: deserialize_pb_MoveFileRequest,
    responseSerialize: serialize_pb_MoveFileResponse,
    responseDeserialize: deserialize_pb_MoveFileResponse,
  },
  // **********
};

exports.FilesRouteClient = grpc.makeGenericClientConstructor(FilesRouteService);
