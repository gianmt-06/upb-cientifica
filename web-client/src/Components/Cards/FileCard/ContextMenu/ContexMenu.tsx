import { Item, Menu, Separator } from "react-contexify";
import {
    IoArrowRedoOutline,
    IoDocumentsOutline,
    IoDownloadOutline,
    IoTrashOutline,
  } from "react-icons/io5";
import "react-contexify/ReactContexify.css";
import "./contextmenu.css"

interface props {
  MENU_ID: string
  onDelete: () => void
  onShare: () => void
  onDownload: () => void
  onProps: () => void
}

export const ContextMenu: React.FC<props> = ({MENU_ID, onDelete, onProps, onShare, onDownload}) => {
  return (
    <Menu id={MENU_ID} theme="light">
      <Item onClick={() => onDelete()}>
        <IoTrashOutline />
        <span className={"context-menu-item-span"}>Delete</span>
      </Item>
      <Separator />
      <Item onClick={() => onShare()}>
        <IoArrowRedoOutline />
        <span className={"context-menu-item-span"}>Share</span>
      </Item>
      <Item onClick={() => onDownload()}>
        <IoDownloadOutline/>
        <span className={"context-menu-item-span"}>Download</span>
      </Item>
      <Separator />
      <Item onClick={() => onProps()}>
        <IoDocumentsOutline />
        <span className={"context-menu-item-span"}>Properties</span>
      </Item>
    </Menu>
  );
};
