import { useContext } from "react";
import "./LikePost.scss";
import postIcon from "../../assets/post_icon.png";
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
      <img src={postIcon} alt="whale icon" />
      {likesCount}
    </button>
  );
};

export default LikePost;
