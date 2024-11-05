"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionsValidator = void 0;
const LdapConnection_1 = require("./LdapConnection");
const XMLReadPermissions_1 = require("./templates/permissions/XMLReadPermissions");
const XMLWritePermissions_1 = require("./templates/permissions/XMLWritePermissions");
const XMLValidateToken_1 = require("./templates/auth/XMLValidateToken");
const XMLGroups_1 = require("./templates/groups/XMLGroups");
const XMLUserStorage_1 = require("./templates/permissions/XMLUserStorage");
const xml2js_1 = require("xml2js");
class PermissionsValidator extends LdapConnection_1.LdapConnection {
    haveWritePermissions = (req, res, next) => {
        try {
            const { token, resource } = this.getData(req);
            const request = (0, XMLWritePermissions_1.XMLWritePermissionsRequest)(token, resource);
            this.validate(req, res, next, request);
        }
        catch (error) {
            res.status(401).json({ error: error.message });
        }
    };
    haveReadPermissions = (req, res, next) => {
        try {
            const { token, resource } = this.getData(req);
            const request = (0, XMLReadPermissions_1.XMLReadPermissionsRequest)(token, resource);
            this.validate(req, res, next, request);
        }
        catch (error) {
            res.status(401).json({ error: error.message });
        }
    };
    requireToken = (req, res, next) => {
        try {
            const token = req.cookies.tkn;
            const request = (0, XMLValidateToken_1.XMLValidateToken)(token);
            this.validate(req, res, next, request);
        }
        catch (error) {
            res.status(401).json({ error: error.message });
        }
    };
    getGroups = (req, res, next) => {
        try {
            const token = req.cookies.tkn;
            const request = (0, XMLGroups_1.XMLGetGroups)(token);
            this.doRequest(request).then(value => {
                (0, xml2js_1.parseString)(value.data, (err, result) => {
                    if (err) {
                        console.log(err.message);
                        return;
                    }
                    const body = result['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0];
                    const response = body['ns1:getGroupsFromUserResponse'][0];
                    const status = response.status[0]._;
                    const uid = response.uid[0]._;
                    const groups = [];
                    const groupsResponse = response.groups[0].item;
                    groupsResponse.forEach((element) => {
                        groups.push(element._);
                    });
                    req.body.groups = groups;
                    req.body.username = uid;
                    if (status == 200) {
                        next();
                        return;
                    }
                    else {
                        res.status(400).json({ ok: "no" });
                        return;
                    }
                });
            }).catch(error => {
                res.status(400).json({ error: error.message });
            });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    getUserStorage = (token) => {
        try {
            const request = (0, XMLUserStorage_1.XMLUserStorage)(token);
            const promise = new Promise((resolve, reject) => {
                this.doRequest(request).then((response) => {
                    const storage = String(response.data).match(/<maxStorage[^>]*>([^<]+)<\/maxStorage>/) || "";
                    resolve(parseInt(storage[1]));
                }).catch(_error => {
                    reject(-1);
                });
            });
            return promise;
        }
        catch (error) {
            return Promise.reject(-1);
        }
    };
    validate = async (req, res, next, request) => {
        this.doRequest(request).then(response => {
            const uid = String(response.data).match(/<uid[^>]*>([^<]+)<\/uid>/) || "";
            const rol = String(response.data).match(/<role[^>]*>([^<]+)<\/role>/) || "";
            const status = String(response.data).match(/<status[^>]*>([^<]+)<\/status>/) || "";
            ;
            const code = parseInt(status[1]);
            if (code === 200 && uid[1]) {
                req.body.username = uid[1];
                req.body.role = rol[1];
                next();
            }
            else if (code === 401)
                res.status(code).json({ error: true, message: "You need auth" });
            else if (code === 403)
                res.status(code).json({ error: true, message: "You dont have permissions" });
            else
                res.status(400).json({ error: true, message: "JIJIJIJA" });
        }).catch(error => {
            res.status(401).json({ error: error.message });
        });
    };
    getData = (req) => {
        const { hash } = req.query;
        const resource = req.header("resource-hash") || hash?.toString();
        const token = req.cookies.tkn;
        if (!resource || !token)
            throw new Error("No resource or not token in request");
        return { token, resource };
    };
}
exports.PermissionsValidator = PermissionsValidator;
//# sourceMappingURL=PermissionsManager.js.map