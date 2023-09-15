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
  type: string;
}

const ShareButton = ({ url, size, type }: ShareButtonProps) => {
  return (
    <div className="share-button-container">
      <FacebookShareButton
        url={url}
        quote={`Check out this Whale ${type}!`}
        hashtag="#whales"
      >
        <FacebookIcon size={size} round />
      </FacebookShareButton>
      <TwitterShareButton
        url={url}
        title={`Check out this Whale ${type}!`}
        hashtags={["#whales", "#whalespotting"]}
      >
        <TwitterIcon size={size} round />
      </TwitterShareButton>
      <EmailShareButton url={url} subject={`Check out this Whale ${type}!`}>
        <EmailIcon size={size} round />
      </EmailShareButton>
      <LinkedinShareButton url={url} title={`Check out this Whale ${type}!`}>
        <LinkedinIcon size={size} round />
      </LinkedinShareButton>
      <WhatsappShareButton url={url} title={`Check out this Whale ${type}!`}>
        <WhatsappIcon size={size} round />
      </WhatsappShareButton>
    </div>
  );
};

export default ShareButton;
