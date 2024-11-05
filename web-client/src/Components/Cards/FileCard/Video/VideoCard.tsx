import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  DefaultVideoLayout,
  defaultLayoutIcons,
} from "@vidstack/react/player/layouts/default";
import { useState } from "preact/hooks";
import { PhotoView } from "react-photo-view";
import { AbstractMediaItem } from "../../../../domain/AbstractMediaItem";
import { Environment } from "../../../../environment/Environment";

interface videocardProps {
  file: AbstractMediaItem
}

export const VideoCard: React.FC<videocardProps> = ({file}) => {

  const [uri, setUri] = useState("")
  const env = new Environment();

  const setHLS = async (): Promise<string> => {
    
    try {
      const promise = await fetch(`${env.STREAMING_URI}/uri/${file.getFingerprint()}`, {
        method: "GET"
      });

      const response = await promise.json();

      setUri(response.hls_url);
      return response.hls_url;
    } catch (error) {
      return ""      
    }
  };


  return (
    <div className="video-hls" onClick={() => {setHLS()}}>
      <PhotoView
        width={700}
        height={700}
        render={({ scale, attrs }) => {
          return (
            <div {...attrs} className={"aa"}>
              <MediaPlayer
                className={"player"}
                title="Sprite Fight"
                src={uri}
              >
                <MediaProvider />
                <DefaultVideoLayout
                  thumbnails="/assets/video-icon.webp"
                  icons={defaultLayoutIcons}
                />
              </MediaPlayer>
            </div>
          );
        }}
      >
        <img
          className="card-image"
          src={"/assets/lastttt.png"}
          style={{ height: 85 }}
          alt="video-image"
        />
      </PhotoView>
    </div>
  );
};
