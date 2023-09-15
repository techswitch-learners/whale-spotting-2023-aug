import PostData from "../../models/PostData";
import { toShortDate } from "../../utils/DateConversion";
import shareIcon from "../../assets/share_icon.png";
import "./FeaturedPostContent.scss";
import Button from "../UI/Button";
import LikePost from "./LikePost";

interface PostDataProps {
  postData: PostData;
  openModalAction: () => void;
}

const FeaturedPostContent = ({ postData, openModalAction }: PostDataProps) => {
  return (
    <>
      <div className="FeaturedPostContent__heading">
        <h3 className="FeaturedPostContent__heading__title">
          {postData.species.name}
        </h3>
        <p className="FeaturedPostContent__heading__bodyofwater">
          {postData.bodyOfWater.name}
        </p>
        <p className="FeaturedPostContent__heading__date">
          {toShortDate(postData.timestamp)}
        </p>
      </div>
      <p className="FeaturedPostContent__description">{postData.description}</p>
      <div className="FeaturedPostContent__sub-section">
        <Button
          className="FeaturedPostContent__view-more"
          onClick={openModalAction}
        >
          View
        </Button>
        <div className="FeaturedPostContent__user">
          <p className="FeaturedPostContent__text">{postData.user.name}</p>
          <div className="FeaturedPostContent__user__image-container">
            <img
              className="FeaturedPostContent__user__image"
              src={postData.user.profileImageUrl}
              alt={`${postData.user.name}'s profile picture`}
            />
          </div>
        </div>
      </div>

      <div className="FeaturedPostContent__interactions">
        <div className="FeaturedPostContent__interactions__likes">
          <LikePost postId={postData.id} likesCount={postData.likes} />
        </div>
        <div>
          <img src={shareIcon} alt="share post" />
        </div>
      </div>
    </>
  );
};

export default FeaturedPostContent;
