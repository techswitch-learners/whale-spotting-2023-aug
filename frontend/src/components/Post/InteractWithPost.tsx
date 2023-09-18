import { useContext } from "react";
import postIcon from "../../assets/post_icon.png";
import { LoginContext } from "../../context/LoginManager";
import "./InteractWithPost.scss";

interface LikePostProps {
  interactionCount: number;
  postId: number;
  hasInteractionFromCurrentUser?: boolean;
  onPostLike: (postId: number) => void;
}

const InteractWithPost = ({
  interactionCount,
  postId,
  hasInteractionFromCurrentUser,
  onPostLike,
}: LikePostProps) => {
  const loginContext = useContext(LoginContext);

  return (
    <button
      disabled={hasInteractionFromCurrentUser || !loginContext.isLoggedIn}
      className="LikePost"
      onClick={() => onPostLike(postId)}
    >
      <img src={postIcon} alt="whale icon" />
      {interactionCount}
    </button>
  );
};

export default InteractWithPost;
