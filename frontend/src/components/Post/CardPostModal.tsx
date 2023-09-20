import PostData from "../../models/PostData";
import { toShortDate } from "../../utils/DateConversion";
import fullscreenIcon from "../../assets/fullscreen_icon.svg";
import ShareButtonExpandable from "../ShareButtonExpandable";
import { Link } from "react-router-dom";
import InteractWithPost from "./InteractWithPost";
import "./CardPostModal.scss";

interface PostDataProps {
  postData: PostData;
  likePost: (postId: number) => void;
}

const CardPostModal = ({ postData, likePost }: PostDataProps) => {
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
            <InteractWithPost
              postId={postData.id}
              interactionCount={postData.interactionCount}
              hasInteractionFromCurrentUser={
                postData.hasInteractionFromCurrentUser
              }
              likePost={likePost}
            />
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
