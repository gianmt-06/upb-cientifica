"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsedStorage = exports.getMaxStorage = exports.validateStorage = void 0;
const FileService_1 = require("../grpc/FileService");
const PermissionsManager_1 = require("../ldap/PermissionsManager");
const validateStorage = async (req, res, next) => {
    try {
        const maxStorage = await (0, exports.getMaxStorage)(req.cookies.tkn); //Cambiar por username
        const usedStorage = await (0, exports.getUsedStorage)(req.body.username);
        if (usedStorage != -1 && maxStorage != -1) {
            if (req.file) {
                const updatedStorage = req.file.size / (1024 * 1024) + usedStorage;
                if (updatedStorage < maxStorage) {
                    next();
                    return;
                }
            }
            else if (usedStorage + 1 < maxStorage) {
                next();
                return;
            }
            res.status(400).json({ error: "Full Storage" });
        }
        else {
            res.status(404).json({ error: "User or Home not found" });
        }
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
};
exports.validateStorage = validateStorage;
const getMaxStorage = async (token) => {
    const maxSize = await new PermissionsManager_1.PermissionsValidator().getUserStorage(token);
    return maxSize;
};
exports.getMaxStorage = getMaxStorage;
const getUsedStorage = async (username) => {
    const homeSize = await new FileService_1.GrpcFileService().getHomeSize(username);
    const size = (homeSize.data || 1) / (1024 * 1024);
    return size;
};
exports.getUsedStorage = getUsedStorage;
//# sourceMappingURL=StorageManager.js.map