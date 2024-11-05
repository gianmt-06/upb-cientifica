import { File as GRPCfile } from "../../contracts/grpc/storage/fileserver_pb"
import { File } from "../../domain/File"
import { getFileRoute } from "../../util/FileRoute";

export const GRPCfileToDomain = (file: GRPCfile, requestURI: string) => {
    return new File(
        file.getName(),
        file.getFingerprint(),
        getFileRoute(file, requestURI),
        file.getSize(),
        file.getOwner(),
        file.getPermissions(),
        new Date(file.getModified()),
        file.getMimetype(),
        file.getPath()
    );
}

export const getFileList = (files: GRPCfile[], requestURI: string) => {
    const mapFiles = files.map(file => {
        return GRPCfileToDomain(file, requestURI);
    })

    return mapFiles;
}