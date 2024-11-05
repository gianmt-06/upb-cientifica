"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseHandler_1 = __importDefault(require("../../responseHandler/ResponseHandler"));
class Controller {
    responseHandler;
    constructor() {
        this.responseHandler = new ResponseHandler_1.default();
    }
}
exports.default = Controller;
//# sourceMappingURL=Controller.js.map