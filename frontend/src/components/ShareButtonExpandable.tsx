import { useState } from "react";
import ShareButton from "./ShareButtons";
import PostData from "../models/PostData";
import ShareIcon from "../assets/share_icon.png";
import "./ShareButtonExpandable.scss";

interface PostDataProps {
  postData: PostData;
  size: number;
  type: string;
}

const ShareButtonExpandable = ({ postData, size, type }: PostDataProps) => {
  const [showShareMenu, setShowShareMenu] = useState(false);

  const toggleShareMenu = () => {
    setShowShareMenu(!showShareMenu);
  };

  return (
    <div className={`share-menu-wrapper ${showShareMenu ? "active" : ""}`}>
      <img
        className={`share-menu-icon ${showShareMenu ? "active" : ""}`}
        src={ShareIcon}
        onClick={toggleShareMenu}
      />
      <div className={`share-links ${showShareMenu ? "active" : ""}`}>
        <ShareButton
          url={`${window.location.protocol}//${window.location.hostname}${
            window.location.port ? ":" + window.location.port : ""
          }${window.location.pathname}#/posts/${postData.id}`}
          size={size}
          type={type}
        />
      </div>
    </div>
  );
};

export default ShareButtonExpandable;
