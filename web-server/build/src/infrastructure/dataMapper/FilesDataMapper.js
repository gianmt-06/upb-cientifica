"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileList = exports.GRPCfileToDomain = void 0;
const File_1 = require("../../domain/File");
const FileRoute_1 = require("../../util/FileRoute");
const GRPCfileToDomain = (file, requestURI) => {
    return new File_1.File(file.getName(), file.getFingerprint(), (0, FileRoute_1.getFileRoute)(file, requestURI), file.getSize(), file.getOwner(), file.getPermissions(), new Date(file.getModified()), file.getMimetype(), file.getPath());
};
exports.GRPCfileToDomain = GRPCfileToDomain;
const getFileList = (files, requestURI) => {
    const mapFiles = files.map(file => {
        return (0, exports.GRPCfileToDomain)(file, requestURI);
    });
    return mapFiles;
};
exports.getFileList = getFileList;
//# sourceMappingURL=FilesDataMapper.js.map