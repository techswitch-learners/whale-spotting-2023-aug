import PostData from "../../models/PostData";
import { toShortDate } from "../../utils/DateConversion";
import shareIcon from "../../assets/share_icon.png";
import "./CardPost.scss";
import LikePost from "./LikePost";

interface PostDataProps {
  postData: PostData;
  openModalAction: () => void;
  onPostLike: (postId: number) => void;
}

const CardPost = ({ postData, openModalAction, onPostLike }: PostDataProps) => {
  return (
    <div className="CardPost">
      <div className="CardPost__banner">
        <div className="CardPost__banner__likes">
          <LikePost
            postId={postData.id}
            likesCount={postData.likes}
            isLiked={postData.isLiked}
            onPostLike={onPostLike}
          />
        </div>
        <div>
          <img src={shareIcon} alt="share post" />
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
        <p className="CardPost__text">{toShortDate(postData.timestamp)}</p>
      </div>
    </div>
  );
};

export default CardPost;
