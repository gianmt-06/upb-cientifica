import { MediaPlayer, MediaProvider } from "@vidstack/react";
import { Modal } from "react-bootstrap";

import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { DefaultVideoLayout, defaultLayoutIcons } from '@vidstack/react/player/layouts/default';

interface VideoModalProps {
    show: boolean;
    handleClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({show, handleClose}) => {
  return (
    <Modal
      className="modal-album"
      show={show}
      onHide={handleClose}
      size="lg"
      centered
    > 
      <Modal.Body>
        <div className="albums-container">
          <MediaPlayer
            className={"player"}
            title="Sprite Fight"
            src="https://files.vidstack.io/sprite-fight/720p.mp4"
          >
            <MediaProvider />
            <DefaultVideoLayout
              thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt"
              icons={defaultLayoutIcons}
            />
          </MediaPlayer>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default VideoModal;
