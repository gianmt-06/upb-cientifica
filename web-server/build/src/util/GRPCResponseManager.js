"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateCode = void 0;
const translateCode = (code) => {
    if (code == undefined)
        return 400;
    switch (code) {
        case 0:
            return 200;
        case 5:
            return 404;
        default:
            return 400;
    }
};
exports.translateCode = translateCode;
//# sourceMappingURL=GRPCResponseManager.js.map