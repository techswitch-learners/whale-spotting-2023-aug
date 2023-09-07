import { ReactNode } from "react";
import "./FeaturedFrame.scss";

interface FeaturedFrameProps {
  imageUrl: string;
  children?: ReactNode;
}

const FeaturedFrame = ({ imageUrl, children }: FeaturedFrameProps) => {
  return (
    <div className="FeaturedFrame">
      <img
        className="FeaturedFrame__image"
        src={imageUrl}
        alt="image for featured item"
      />
      <div className="FeaturedFrame__content">{children}</div>
    </div>
  );
};

export default FeaturedFrame;
