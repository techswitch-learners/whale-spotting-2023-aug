import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import "./ShareButton.scss";

interface ShareButtonProps {
  url: string;
  size: number;
}

const ShareButton = ({ url, size }: ShareButtonProps) => {
  return (
    <div className="share-button-container">
      <FacebookShareButton
        url={url}
        quote={"Check out this Whale Spotting Event!"}
        hashtag="#whales"
      >
        <FacebookIcon size={size} round />
      </FacebookShareButton>
      <TwitterShareButton
        url={url}
        title={"Check out this Whale Spotting Event!"}
        hashtags={["#whales", "#whalespotting"]}
      >
        <TwitterIcon size={size} round />
      </TwitterShareButton>
      <EmailShareButton
        url={url}
        subject={"Check out this Whale Spotting Event!"}
      >
        <EmailIcon size={size} round />
      </EmailShareButton>
      <LinkedinShareButton
        url={url}
        title={"Check out this Whale Spotting Event!"}
      >
        <LinkedinIcon size={size} round />
      </LinkedinShareButton>
      <WhatsappShareButton
        url={url}
        title={"Check out this Whale Spotting Event!"}
      >
        <WhatsappIcon size={size} round />
      </WhatsappShareButton>
    </div>
  );
};

export default ShareButton;
