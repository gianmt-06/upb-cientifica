import { Button, Form, Modal } from "react-bootstrap";
import "./chmodmodal.css";
import { AbstractMediaItem } from "../../../domain/AbstractMediaItem";
import { useParams } from "react-router-dom";

interface FilePropsModal {
  show: boolean;
  file: AbstractMediaItem;
  handleClose: () => void;
  handleSave: (folder: string, fingerprint: string, permissions: string) => void;
  handleAddToGroup: (user: string) => void
}

export const ChmodModal: React.FC<FilePropsModal> = ({
  show,
  file,
  handleClose,
  handleSave,
  handleAddToGroup
}) => {
  const { hash } = useParams();

  const getPermissions = () => {
    const groupValue = document.getElementById('group-perms') as HTMLSelectElement;
    const othersValue = document.getElementById('others-perms') as HTMLSelectElement;
    return groupValue.value + othersValue.value;
  };

  const addToGroup = () => {
    const user = document.getElementById('user') as HTMLInputElement;
    if (user) handleAddToGroup(user.value)
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Share File</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-props-content">
          <div className="group-perms">
            <label htmlFor="">Group</label>
            <Form.Select value={file.getPermissions()[2]} id={"group-perms"}>
              <option value="0">No access</option>
              <option value="4">Can Only View Content</option>
              <option value="7">Can View & Modify Content</option>
            </Form.Select>
          </div>
          <div className="others-perms">
            <label htmlFor="">Others</label>
            <Form.Select value={file.getPermissions()[3]} id={"others-perms"}>
              <option value="0">No access</option>
              <option value="4">Can Only View Content</option>
              <option value="7">Can View & Modify Content</option>
            </Form.Select>
          </div>
          <div className="add-to-group">
            <span>Add to group:</span>
            <input type="text"  name="user" id={"user"} className="form-control" placeholder="User" aria-label="Username" aria-describedby="basic-addon1"></input>
            <Button onClick={() => addToGroup()}>Add</Button>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button 
          variant="secondary"
          onClick={() => handleSave(hash || "", file.getFingerprint(), getPermissions())}
        > 
          Ok
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
