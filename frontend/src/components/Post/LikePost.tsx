import { useContext } from "react";
import "./LikePost.scss";
import postIcon from "../../assets/post_icon.png";
import { LoginContext } from "../../context/LoginManager";
import { likePost } from "../../clients/backendApiClient";

interface LikePostProps {
  likesCount: number;
  postId: number;
}

const LikePost = ({ likesCount, postId }: LikePostProps) => {
  const loginContext = useContext(LoginContext);

  const handleLike = () => {
    if (loginContext.isLoggedIn) {
      likePost(postId, loginContext.userBase);
    }
  };

  return (
    <button className="LikePost" onClick={handleLike}>
      <img src={postIcon} alt="whale icon" />
      {likesCount}
    </button>
  );
};

export default LikePost;
