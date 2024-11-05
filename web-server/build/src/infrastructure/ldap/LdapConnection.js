"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LdapConnection = void 0;
const axios_1 = __importDefault(require("axios"));
const Environment_1 = require("../../environment/Environment");
class LdapConnection {
    env;
    ldapUri;
    constructor() {
        this.env = new Environment_1.Environment();
        this.ldapUri = this.env.LDAP_URI;
    }
    doRequest = async (XMLrequest, endpoint) => {
        try {
            const response = await axios_1.default.post(`${this.ldapUri}${endpoint || ""}`, XMLrequest, {
                headers: {
                    'Content-Type': 'text/xml;charset=UTF-8',
                },
            });
            return { status: response.status, data: response.data };
        }
        catch (error) {
            console.log(error);
            return { status: 500, data: "" };
        }
    };
}
exports.LdapConnection = LdapConnection;
//# sourceMappingURL=LdapConnection.js.map