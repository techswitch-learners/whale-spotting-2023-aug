import { useState } from "react";
import ShareButton from "./ShareButtons";
import PostData from "../models/PostData";
import ShareIcon from "../assets/share_icon.png";

interface PostDataProps {
  postData: PostData;
}

const ShareButtonExpandable = ({ postData }: PostDataProps) => {
  const [showShareMenu, setShowShareMenu] = useState(false);

  const toggleShareMenu = () => {
    setShowShareMenu(!showShareMenu);
  };

  return (
    <div className="share-menu-wrapper">
      <img
        className="share-menu-icon"
        src={ShareIcon}
        onClick={toggleShareMenu}
      />
      <div className={`share-links ${showShareMenu ? "active" : ""}`}>
        <ShareButton eventUrl={postData.imageUrl} />
      </div>
    </div>
  );
};

export default ShareButtonExpandable;
