import { PhotoView } from "react-photo-view";

interface props {
    filePath: string
}

export const ImageCard: React.FC<props> = ({filePath}) => {
    return (
        <PhotoView src={filePath}>
            <img
              className="card-image"
              src={filePath}
              style={{ objectFit: "cover" }}
              alt="image-thumbnail"
            />
          </PhotoView>
    );
}