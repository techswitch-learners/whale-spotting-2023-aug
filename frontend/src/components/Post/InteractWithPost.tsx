import { useContext } from "react";
import likeIcon from "../../assets/likeIcon.svg";
import { LoginContext } from "../../context/LoginManager";
import "./InteractWithPost.scss";

interface InteractWithPostProps {
  interactionCount: number;
  postId: number;
  hasInteractionFromCurrentUser?: boolean;
  likePost: (postId: number) => void;
}

const InteractWithPost = ({
  interactionCount,
  postId,
  hasInteractionFromCurrentUser,
  likePost,
}: InteractWithPostProps) => {
  const loginContext = useContext(LoginContext);

  return (
    <button
      disabled={hasInteractionFromCurrentUser || !loginContext.isLoggedIn}
      className="LikePost"
      onClick={() => likePost(postId)}
    >
      <img className="LikePost__Icon" src={likeIcon} alt="like icon" />
      {interactionCount}
    </button>
  );
};

export default InteractWithPost;
