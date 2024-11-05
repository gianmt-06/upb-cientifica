"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = __importDefault(require("../../infrastructure/express/controller/Controller"));
class TestController extends Controller_1.default {
    constructor() {
        super();
    }
    printHealth = (_req, res) => {
        try {
            res.status(201).json({ message: "Online" });
        }
        catch (error) {
            res.status(500).json(this.responseHandler.serverError());
        }
    };
}
exports.default = TestController;
//# sourceMappingURL=TestController.js.map