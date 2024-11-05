"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenAuth = void 0;
const Environment_1 = require("../../environment/Environment");
class TokenAuth {
    env;
    constructor() {
        this.env = new Environment_1.Environment();
    }
    generateToken(token, res) {
        try {
            res.cookie("tkn", token, {
                httpOnly: true,
                secure: !(this.env.MODE === "developer"),
                // sameSite: "none"
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    deleteToken(res) {
        try {
            res.cookie("tkn", "null", {
                maxAge: 1000,
                httpOnly: true,
                secure: !(this.env.MODE === "developer"),
                // sameSite: "none"
            });
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.TokenAuth = TokenAuth;
//# sourceMappingURL=TokenAuth.js.map