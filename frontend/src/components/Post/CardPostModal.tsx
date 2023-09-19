import { convertLikesToString } from "../../utils/LikeConversion";
import PostData from "../../models/PostData";
import { toShortDate } from "../../utils/DateConversion";
import postIcon from "../../assets/post_icon.png";
import fullscreenIcon from "../../assets/fullscreen_icon.svg";
import ShareButtonExpandable from "../ShareButtonExpandable";
import { Link } from "react-router-dom";
import "./CardPostModal.scss";

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
            <a href={`#/search?bodyOfWater=${postData.bodyOfWater.name}`}>
              {postData.bodyOfWater.name}
            </a>
          </p>
          <p className="CardPostModal__heading__date">
            {toShortDate(postData.creationTimestamp)}
          </p>
        </div>
        <p className="CardPostModal__description">{postData.description}</p>
        <Link to={`/users/${postData.user.id}`}>
          <div className="CardPostModal__user">
            <h3 className="CardPostModal__text">{postData.user.name}</h3>
            <div className="CardPostModal__user__image-container">
              <img
                className="CardPostModal__user__image"
                src={postData.user.profileImageUrl}
                alt={`${postData.user.name}'s profile picture`}
              />
            </div>
          </div>
        </Link>
        <div className="CardPostModal__interactions">
          <div className="CardPostModal__interactions__likes">
            <img src={postIcon} alt="whale icon" />
            <span>{convertLikesToString(postData.interactionCount)}</span>
          </div>
          <div>
            <ShareButtonExpandable
              postData={postData}
              size={36}
              type={"sighting"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPostModal;
