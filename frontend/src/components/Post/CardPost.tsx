import PostData from "../../models/PostData";
import { toShortDate } from "../../utils/DateConversion";
import ShareButtonExpandable from "../ShareButtonExpandable";
import InteractWithPost from "./InteractWithPost";
import "./CardPost.scss";

interface PostDataProps {
  postData: PostData;
  openModalAction: () => void;
  likePost: (postId: number) => void;
}

const CardPost = ({ postData, openModalAction, likePost }: PostDataProps) => {
  return (
    <div className="CardPost">
      <div className="CardPost__banner">
        <div className="CardPost__banner__likes">
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
            size={24}
            type={"sighting"}
          />
        </div>
      </div>
      <img
        className="CardPost__image"
        src={postData.imageUrl}
        alt={`image of ${postData.species.name}`}
        onClick={openModalAction}
      />
      <div className="CardPost__info">
        <p className="CardPost__title">{postData.species.name}</p>
        <p className="CardPost__text">{postData.user.name}</p>
        <p className="CardPost__text">
          {toShortDate(postData.creationTimestamp)}
        </p>
      </div>
    </div>
  );
};

export default CardPost;
