import { NextFunction, Request, Response } from "express";
import { GrpcFileService } from "../../grpc/FileService"
import { PermissionsValidator } from "../ldap/PermissionsManager";

export const validateStorage = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const maxStorage = await getMaxStorage(req.cookies.tkn); //Cambiar por username
        const usedStorage = await getUsedStorage(req.body.username);

        if (usedStorage != -1 && maxStorage != -1) {

            if (req.file){
                const updatedStorage = req.file.size / (1024 * 1024) + usedStorage;

                if (updatedStorage < maxStorage) {
                    next();
                    return
                }

            } else if (usedStorage + 1 < maxStorage) {
                next();
                return;
            }
            
            res.status(400).json({ error: "Full Storage" })
        } else {
            res.status(404).json({ error: "User or Home not found" })
        }

    } catch (error) {
        res.status(401).json({ error: (error as Error).message });
    }
}

export const getMaxStorage = async (token: string) => {
    const maxSize = await new PermissionsValidator().getUserStorage(token);
    return maxSize;
}

export const getUsedStorage = async (username: string) => {
    const homeSize = await new GrpcFileService().getHomeSize(username);
    const size = (homeSize.data || 1) / (1024 * 1024);
    
    return size;
}   