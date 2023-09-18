import { useContext } from "react";
import likeIcon from "../../assets/likeIcon.svg";
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
      <img className="LikePost__Icon" src={likeIcon} alt="like icon" />
      {interactionCount}
    </button>
  );
};

export default InteractWithPost;
