"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialsManager = void 0;
const LdapConnection_1 = require("./LdapConnection");
const XMLLogin_1 = require("./templates/auth/XMLLogin");
const XMLRegister_1 = require("./templates/auth/XMLRegister");
const XMLAddToGroup_1 = require("./templates/groups/XMLAddToGroup");
class CredentialsManager extends LdapConnection_1.LdapConnection {
    login = async (username, password) => {
        try {
            const request = (0, XMLLogin_1.XMLLoginRequest)(username, password);
            const response = await this.doRequest(request);
            let code = String(response.data).match(/<status[^>]*>([^<]+)<\/status>/) || "404";
            let token = String(response.data).match(/<token[^>]*>([^<]+)<\/token>/) || "";
            if (token)
                token = token[1].toString();
            if (code)
                code = code[1].toString();
            return Promise.resolve({ code: parseInt(code), token: token });
        }
        catch (error) {
            return Promise.resolve({ code: 404, token: "" });
        }
    };
    register = async (token, data) => {
        try {
            const request = (0, XMLRegister_1.XMLRegisterRequest)(token, data);
            const response = await this.doRequest(request);
            const code = String(response.data).match(/<status[^>]*>([^<]+)<\/status>/) || "404";
            return Promise.resolve(parseInt(code[1].toString()));
        }
        catch (error) {
            return Promise.resolve(500);
        }
    };
    addToGroup = async (token, group, username) => {
        try {
            const request = (0, XMLAddToGroup_1.XMLAddToGroup)(token, group, username);
            const response = await this.doRequest(request);
            const code = String(response.data).match(/<status[^>]*>([^<]+)<\/status>/) || "404";
            return Promise.resolve(parseInt(code[1].toString()));
        }
        catch (error) {
            return Promise.resolve(500);
        }
    };
}
exports.CredentialsManager = CredentialsManager;
//# sourceMappingURL=CredentialsManager.js.map