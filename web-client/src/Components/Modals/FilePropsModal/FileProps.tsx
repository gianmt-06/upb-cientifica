import { Button, Form, Modal } from "react-bootstrap";
import "./fileprops.css";
import { AbstractMediaItem } from "../../../domain/AbstractMediaItem";

interface FilePropsModal {
  show: boolean;
  file: AbstractMediaItem;
  handleClose: () => void;
}

export const FilePropsModal: React.FC<FilePropsModal> = ({
  show,
  file,
  handleClose,
}) => {
  const getThumbnail = (file: AbstractMediaItem) => {
    if (file.getMimeType() === "dir") return "/assets/folder-icon.webp";
    return file.getThumbnail();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body>
        <div className="modal-props-content">
          <div className="modal-props-first-row">
            <div className="img-props-container">
              <img
                className={"modal-props-img"}
                src={getThumbnail(file)}
                alt=""
              />
            </div>
            <div className="modal-props-file-name">
              <Form.Control
                type="text"
                id="name"
                placeholder="file name"
                value={file.getName()}
              />
            </div>
          </div>

          <div className="props-container-data">
            <div className="prop-section">
              <p>Type:</p>
              <span>{file.getMimeType()}</span>
            </div>
            <div className="prop-section">
              <p>Path:</p>
              <span>{file.getPath()}</span>
            </div>
            <div className="prop-section">
              <p>Size:</p>
              <span>
              {(file.getSize() / 1024).toFixed(2)} Kb 
              </span>
            </div>
            <div className="prop-section">
              <p>Owner:</p>
              <span>{file.getOwner()}</span>
            </div>
            <div className="prop-section">
              <p>Permissions:</p>
              <span>{file.getPermissions().toString()}</span>
            </div>
            <div className="prop-section">
              <p>Modified:</p>
              <span>{file.getModifiedAt().toString()}</span>
            </div>
          </div>

          {/* <div className="modal-props-second-row">
            
            <div className="modal-props-second-row-labels">
              <p>Type:</p>
              <p>Path:</p>
              <p>Size:</p>
              <p>Owner:</p>
              <p>Permissions:</p>
              <p>Modified:</p>
            </div>
            <div className="modal-props-second-row-content">
              <p>{file.getMimeType()}</p>
              <p>{file.getPath()}</p>
              <p>
                {(file.getSize() / (1024)).toFixed(2)} Kb
              </p>
              <p>{file.getPermissions().toString()}</p>
              <p>{file.getOwner()}</p>
              <p>{file.getModifiedAt().toString()}</p>
            </div>
          </div> */}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Ok
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
