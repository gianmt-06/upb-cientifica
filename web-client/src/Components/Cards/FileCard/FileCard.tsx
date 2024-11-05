import "./filecard.css";

import { VideoCard } from "./Video/VideoCard";
import { ImageCard } from "./Image/ImageCard";
import { FolderCard } from "./Folder/FolderCard";
import { useContextMenu } from "react-contexify";
import { ContextMenu } from "./ContextMenu/ContexMenu";
import { AbstractMediaItem } from "../../../domain/AbstractMediaItem";
import { Link } from "react-router-dom";

interface FileProps {
  file: AbstractMediaItem;
  bindDelete: (path: string) => void;
  bindProps: (file: AbstractMediaItem) => void; 
  bindShare: (file: AbstractMediaItem) => void; 
  bindDownload: (fingerprint: string, name: string, size: number) => void;
}

export const FileCard: React.FC<FileProps> = ({ file, bindDelete, bindProps, bindShare, bindDownload}) => {
  const MENU_ID = file.getFingerprint();
  const type = file.getMimeType().split("/")[0];

  const { show } = useContextMenu({ id: MENU_ID });

  // setHLS(file.getFingerprint())

  return (
    <div
      className="card-component"
      onContextMenu={(e: Event) => show({ event: e })}
    >
      <ContextMenu
        MENU_ID={MENU_ID}
        onDelete={() => {
          bindDelete(file.getFingerprint());
        }}
        onProps={() => {
          bindProps(file);
        }}
        onShare={() => {
          bindShare(file);
        }}
        onDownload={() => {
          bindDownload(file.getFingerprint(), file.getName(), file.getSize());
        }}
      ></ContextMenu>

      <div className="image-container">
        {type === "dir" ? (
          <Link to={`/folder/${file.getFingerprint()}`}>
            <FolderCard></FolderCard>
          </Link>
        ) : type === "image" ? (
          <ImageCard
            filePath={file.getThumbnail() || file.getFingerprint()}
          ></ImageCard>
        ) : type === "video" ? (
          <VideoCard file={file}></VideoCard>
        ) : (
          <img
            className="card-image"
            src="/assets/file-icon.webp"
            style={{ objectFit: "cover" }}
            alt="folder-image"
          />
        )}
      </div>

      <p className="card-name">{file.getName().slice(0, 15)}</p>
    </div>
  );
};
