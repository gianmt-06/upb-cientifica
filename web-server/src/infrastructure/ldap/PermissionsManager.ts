import { NextFunction, Request, Response } from "express";
import { AuthServer } from "./AuthServer";
import { XMLReadPermissionsRequest } from "./templates/permissions/XMLReadPermissions";
import { XMLWritePermissionsRequest } from "./templates/permissions/XMLWritePermissions";
import { XMLValidateToken } from "./templates/auth/XMLValidateToken";
import { XMLGetGroups } from "./templates/groups/XMLGroups";
import { XMLUserStorage } from "./templates/permissions/XMLUserStorage";
import { parseString } from "xml2js";
// import { XMLReadPermissionsRequest } from "./templates/XMLReadPermissions";
// import { XMLWritePermissionsRequest } from "./templates/XMLWritePermissions";

interface group {
    _: string,
}

export class PermissionsValidator extends AuthServer {

    public haveWritePermissions = (req: Request, res: Response, next: NextFunction) => {
        try {
            const { token, resource } = this.getData(req);

            const request = XMLWritePermissionsRequest(token, resource);

            this.validate(req, res, next, request);
        } catch (error) {
            res.status(401).json({ error: (error as Error).message });
        }
    }

    public haveReadPermissions = (req: Request, res: Response, next: NextFunction) => {
        try {
            const { token, resource } = this.getData(req);

            const request = XMLReadPermissionsRequest(token, resource);

            this.validate(req, res, next, request);
        } catch (error) {
            res.status(401).json({ error: (error as Error).message });
        }
    }

    public requireToken = (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.cookies.tkn;

            const request = XMLValidateToken(token);

            this.validate(req, res, next, request);
        } catch (error) {
            res.status(401).json({ error: (error as Error).message });
        }
    }

    public getGroups = (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.cookies.tkn;

            const request = XMLGetGroups(token);

            this.doRequest(request).then(value => {
                
                parseString(value.data, (err, result) => {
                    if (err) {
                        console.log((err as Error).message);
                        return
                    }

                    const body = result['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0];

                    const response = body['ns1:getGroupsFromUserResponse'][0];

                    const status = response.status[0]._;
                    const uid = response.uid[0]._;
                    const groups: string[] = [];
                    
                    const groupsResponse = response.groups[0].item;

                    groupsResponse.forEach((element: group) => {
                        groups.push(element._);
                    });

                    req.body.groups = groups;
                    req.body.username = uid;                    

                    if (status == 200) {                                                
                        next()
                        return
                    } else {
                        res.status(400).json({ ok: "no" });
                        return
                    }
                })
            }).catch(error => {
                res.status(400).json({ error: (error as Error).message });
            })

        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    public getUserStorage = (token: string) => {
        try {
            const request = XMLUserStorage(token);

            const promise = new Promise<number>((resolve, reject) => {
                this.doRequest(request).then((response,) => {
                    const storage = String(response.data).match(/<maxStorage[^>]*>([^<]+)<\/maxStorage>/) || "";
                    resolve(parseInt(storage[1]));
                }).catch(_error => {
                    reject(-1);
                })
            })

            return promise;
        } catch (error) {
            return Promise.reject(-1);
        }
    }

    private validate = async (req: Request, res: Response, next: NextFunction, request: string) => {

        this.doRequest(request).then(response => {
            const uid = String(response.data).match(/<uid[^>]*>([^<]+)<\/uid>/) || "";
            const rol = String(response.data).match(/<role[^>]*>([^<]+)<\/role>/) || "";

            const status = String(response.data).match(/<status[^>]*>([^<]+)<\/status>/) || "";;
            const code = parseInt(status[1]);

            if (code === 200 && uid[1]) {
                req.body.username = uid[1];
                req.body.role = rol[1];
                next();
            }
            else if (code === 401) res.status(code).json({ error: true, message: "You need auth" });
            else if (code === 403) res.status(code).json({ error: true, message: "You dont have permissions" });
            else res.status(400).json({ error: true, message: "JIJIJIJA" });

        }).catch(error => {
            res.status(401).json({ error: (error as Error).message });
        })
    }

    private getData = (req: Request) => {
        const { hash } = req.query;

        const resource = req.header("resource-hash") || hash?.toString();

        const token = req.cookies.tkn;

        if (!resource || !token) throw new Error("No resource or not token in request");

        return { token, resource }
    }
}