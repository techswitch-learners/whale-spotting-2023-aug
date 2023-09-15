import PostData from "../../models/PostData";
import { toShortDate } from "../../utils/DateConversion";
import shareIcon from "../../assets/share_icon.png";
import fullscreenIcon from "../../assets/fullscreen_icon.svg";

import "./CardPostModal.scss";
import LikePost from "./LikePost";

interface PostDataProps {
  postData: PostData;
}

const CardPostModal = ({ postData }: PostDataProps) => {
  return (
    <div className="CardPostModal">
      <div className="CardPostModal__image__container">
        <img
          className="CardPostModal__image"
          src={postData.imageUrl}
          alt={`image of ${postData.species.name}`}
        />
        <a href={postData.imageUrl} target="_blank">
          <img
            className="CardPostModal__fullscreen"
            src={fullscreenIcon}
            alt="Show image fullscreen"
          />
        </a>
      </div>

      <div className="CardPostModal__content">
        <div className="CardPostModal__heading">
          <h3 className="CardPostModal__heading__title">
            {postData.species.name}
          </h3>
          <p className="CardPostModal__heading__bodyofwater">
            {postData.bodyOfWater.name}
          </p>
          <p className="CardPostModal__heading__date">
            {toShortDate(postData.timestamp)}
          </p>
        </div>
        <p className="CardPostModal__description">{postData.description}</p>
        <div className="CardPostModal__user">
          <p className="CardPostModal__text">{postData.user.name}</p>
          <div className="CardPostModal__user__image-container">
            <img
              className="CardPostModal__user__image"
              src={postData.user.profileImageUrl}
              alt={`${postData.user.name}'s profile picture`}
            />
          </div>
        </div>
        <div className="CardPostModal__interactions">
          <div className="CardPostModal__interactions__likes">
            <LikePost
              postId={postData.id}
              likesCount={postData.likes}
              isLiked={postData.isLiked}
            />
          </div>
          <div>
            <img src={shareIcon} alt="share post" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPostModal;
