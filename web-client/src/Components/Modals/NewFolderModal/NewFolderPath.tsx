import { useState } from "preact/hooks";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";

interface props {
  path: string;
  show: boolean;
  parent: string;
  close: () => void;
  add: (folderId: string, folderName: string) => void;
}

export const NewFolderModal: React.FC<props> = ({
  path,
  show,
  close,
  add,
  parent,
}) => {
  const [folderName, setFolderName] = useState("");

  const handleSave = () => {
    add(parent, folderName);
    console.log("save",folderName);
    setFolderName("");
    close();
  };

  const handleInputChange = (event: any) => {
    const inputValue: string = event.target.value;
    setFolderName(inputValue.replace(/[\/ ]/g, '')); 
  };

  return (
    <Modal show={show} onHide={() => close()} centered>
      <Modal.Header closeButton>Create new album in "{path}"</Modal.Header>
      <Modal.Body>
        <FloatingLabel controlId="floatingInputGrid" label="Folder name">
          <Form.Control
            type="text"
            placeholder="Your Folder Name"
            onChange={handleInputChange}
            value={folderName}
          />
        </FloatingLabel>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => close()}>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleSave()}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
