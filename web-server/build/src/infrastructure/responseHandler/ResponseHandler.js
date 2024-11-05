"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseHandler {
    response(message, data) {
        return {
            error: false,
            message,
            data
        };
    }
    throwError(message) {
        return {
            error: true,
            message
        };
    }
    serverError() {
        return this.throwError("Error de servidor");
    }
}
exports.default = ResponseHandler;
//# sourceMappingURL=ResponseHandler.js.map