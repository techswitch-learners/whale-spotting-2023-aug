import { useContext } from "react";
import "./LikePost.scss";
import likeIcon from "../../assets/likeIcon.svg";
import { LoginContext } from "../../context/LoginManager";

interface LikePostProps {
  likesCount: number;
  postId: number;
  isLiked?: boolean;
  onPostLike: (postId: number) => void;
}

const LikePost = ({
  likesCount,
  postId,
  isLiked,
  onPostLike,
}: LikePostProps) => {
  const loginContext = useContext(LoginContext);

  return (
    <button
      disabled={isLiked || !loginContext.isLoggedIn}
      className="LikePost"
      onClick={() => onPostLike(postId)}
    >
      <img className="LikePost__Icon" src={likeIcon} alt="like icon" />
      {likesCount}
    </button>
  );
};

export default LikePost;
