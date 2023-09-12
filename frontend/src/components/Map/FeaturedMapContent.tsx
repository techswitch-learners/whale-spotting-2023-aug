import { convertLikesToString } from "../../utils/LikeConversion";
import PostDataMap from "../../models/PostData";
import shareIcon from "../../assets/share_icon.png";
import postIcon from "../../assets/post_icon.png";

import "./FeaturedPostContent.scss";
import Button from "../UI/Button";

interface PostDataMapProps {
  postDataMap: PostDataMap;
  openModalAction: () => void;
}

const FeaturedMapContent = ({
  postDataMap,
  openModalAction,
}: PostDataMapProps) => {
  return (
    <>
      <div className="FeaturedPostContent__heading">
        <h3 className="FeaturedPostContent__heading__title">
          {postDataMap.species}
        </h3>
        <p className="FeaturedPostContent__heading__bodyofwater">
          South Atlantic
        </p>
        <p className="FeaturedPostContent__heading__date">
          {" "}
          {postDataMap.sightingDate}
        </p>
      </div>

      <div className="FeaturedPostContent__sub-section">
        <Button
          className="FeaturedPostContent__view-more"
          onClick={openModalAction}
        >
          View
        </Button>
        <div className="FeaturedPostContent__user">
          <p className="FeaturedPostContent__text">{postDataMap.username}</p>
          <div className="FeaturedPostContent__user__image-container">
            <img
              className="FeaturedPostContent__user__image"
              src="https://itsnotacareer.files.wordpress.com/2021/12/for-profile.jpg?w=816"
              alt={`${postDataMap.username}'s profile picture`}
            />
          </div>
        </div>
      </div>

      <div className="FeaturedPostContent__interactions">
        <div className="FeaturedPostContent__interactions__likes">
          <img src={postIcon} alt="whale icon" />
          <span>{convertLikesToString(postDataMap.likes)}</span>
        </div>
        <div>
          <img src={shareIcon} alt="share post" />
        </div>
      </div>
    </>
  );
};

export default FeaturedMapContent;
