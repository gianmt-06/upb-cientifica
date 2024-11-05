"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileRoute = void 0;
const getFileRoute = (file, requestURI) => {
    return (file.getMimetype().split("/")[0] === "image") ? `${requestURI}/files/image?hash=${file.getFingerprint()}` : "";
};
exports.getFileRoute = getFileRoute;
//# sourceMappingURL=FileRoute.js.map