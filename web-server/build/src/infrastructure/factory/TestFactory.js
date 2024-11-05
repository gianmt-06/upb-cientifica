"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TestController_1 = __importDefault(require("../../api/controllers/TestController"));
const TestRouter_1 = __importDefault(require("../../api/routers/TestRouter"));
class TestFactory {
    static getRouter = () => {
        const controller = new TestController_1.default();
        return new TestRouter_1.default(controller);
    };
}
exports.default = TestFactory;
//# sourceMappingURL=TestFactory.js.map