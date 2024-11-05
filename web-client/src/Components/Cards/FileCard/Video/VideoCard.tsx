import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  DefaultVideoLayout,
  defaultLayoutIcons,
} from "@vidstack/react/player/layouts/default";
import { useState } from "preact/hooks";
import { PhotoView } from "react-photo-view";
import { AbstractMediaItem } from "../../../../domain/AbstractMediaItem";

interface videocardProps {
  file: AbstractMediaItem
}

export const VideoCard: React.FC<videocardProps> = ({file}) => {

  const [uri, setUri] = useState("")

  const setHLS = async (): Promise<string> => {
    console.log("setting uri");
    
    try {
      const promise = await fetch("http://10.152.164.104:5000/stream", {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fingerprint: file.getFingerprint()
        }),
      });

      const response = await promise.json();
  
      console.log(response.hls_url);
      
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
                src={"http://192.168.56.3/hls/vod/cFlucrNb5FKbDVue9Wj6xg/oQOIq-1cVW2uELCZECjhkQ/1729663987/_,48,72,0p.mp4.play/master.m3u8"}
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
          // style={{ objectFit: "cover",  }}

          alt="video-image"
        />
      </PhotoView>
    </div>
  );
};
