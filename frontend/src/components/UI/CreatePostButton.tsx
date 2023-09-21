import { Link } from "react-router-dom";
import "./CreatePostButton.scss";

const CreatePostButton = () => {
  return (
    <div className="CreatePostButton">
      <div className="CreatePostButton__Wrapper">
        <Link className="CreatePostButton__Btn" to={"/posts/create"}>
          <span className="CreatePostButton__Btn--icon">+</span>
          <span className="CreatePostButton__Btn--text">Create Post</span>
        </Link>
      </div>
    </div>
  );
};

export default CreatePostButton;
