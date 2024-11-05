import { AbstractMediaItem } from "../../domain/AbstractMediaItem";
import { MediaItem } from "../../domain/MediaItem";
import { ApiFile } from "../interfaces/FileInterface";

export class FileMapper {

    public toDomain(file: ApiFile) : AbstractMediaItem{
        return new MediaItem(
            file._name,
            file._id,
            file._size,
            file._permissions,
            file._owner,
            new Date(file._modified),
            file._mime_type,
            file._path,
            file._route
        )
    }   
}