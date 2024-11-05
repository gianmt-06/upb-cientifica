import { File } from "../contracts/grpc/storage/fileserver_pb"

export const getFileRoute = (file: File, requestURI: string) => {
    return (file.getMimetype().split("/")[0] === "image") ? `${requestURI}/files/image?hash=${file.getFingerprint()}` : ""
}