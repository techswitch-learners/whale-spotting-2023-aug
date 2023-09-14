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

interface EventUrlProps {
  eventUrl: string;
}
const ShareButton = ({ eventUrl }: EventUrlProps) => {
  return (
    <div className="share-button-container">
      <FacebookShareButton
        url={eventUrl}
        quote={"Check out this Whale Spotting Event!"}
        hashtag="#whales"
      >
        <FacebookIcon size={48} round />
      </FacebookShareButton>
      <TwitterShareButton
        url={eventUrl}
        title={"Check out this Whale Spotting Event!"}
        hashtags={["#whales", "#whalespotting"]}
      >
        <TwitterIcon size={48} round />
      </TwitterShareButton>
      <EmailShareButton
        url={eventUrl}
        subject={"Check out this Whale Spotting Event!"}
      >
        <EmailIcon size={48} round />
      </EmailShareButton>
      <LinkedinShareButton
        url={eventUrl}
        title={"Check out this Whale Spotting Event!"}
      >
        <LinkedinIcon size={48} round />
      </LinkedinShareButton>
      <WhatsappShareButton
        url={eventUrl}
        title={"Check out this Whale Spotting Event!"}
      >
        <WhatsappIcon size={48} round />
      </WhatsappShareButton>
    </div>
  );
};

export default ShareButton;
