import { useContext } from "react";
import "./LikePost.scss";
import postIcon from "../../assets/post_icon.png";
import { LoginContext } from "../../context/LoginManager";
import { likePost } from "../../clients/backendApiClient";

interface LikePostProps {
  likesCount: number;
  postId: number;
  isLiked?: boolean;
}

const LikePost = ({ likesCount, postId, isLiked }: LikePostProps) => {
  const loginContext = useContext(LoginContext);

  const handleLike = () => {
    if (loginContext.isLoggedIn) {
      likePost(postId, loginContext.userBase);
    }
  };

  return (
    <button
      disabled={isLiked || !loginContext.isLoggedIn}
      className="LikePost"
      onClick={handleLike}
    >
      <img src={postIcon} alt="whale icon" />
      {likesCount}
    </button>
  );
};

export default LikePost;
