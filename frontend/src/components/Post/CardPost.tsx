import { PostData } from "../../pages/Posts";
import "./CardPost.scss";

interface PostDataProps {
  postData: PostData;
  setPostDetails: (post: PostData) => void;
}

const convertLikesToString = (likes: number) => {
  if (likes > 1000) {
    const thousands = Math.floor(likes / 1000);
    const hundreds = Math.floor((likes / 1000 - thousands) * 10);
    if (hundreds === 0) {
      return `${thousands}k`;
    } else {
      return `${thousands}.${hundreds}k`;
    }
  }
  return likes.toString();
};

const CardPost = ({ postData, setPostDetails }: PostDataProps) => {
  const imageClickHandler = () => {
    setPostDetails(postData);
  };

  return (
    <div className="CardPost">
      <div className="CardPost__banner">
        <div className="CardPost__banner__likes">
          <img src="/post_icon.png" alt="whale icon" />
          <span>{convertLikesToString(postData.likes)}</span>
        </div>
        <div>
          <img src="/share_icon.png" alt="share post" />
        </div>
      </div>
      <img
        className="CardPost__image"
        src={postData.imageUrl}
        alt={`image of ${postData.species}`}
        onClick={imageClickHandler}
      />
      <div className="CardPost__info">
        <p className="CardPost__title">{postData.species}</p>
        <p className="CardPost__text">{postData.username}</p>
        <p className="CardPost__text">{postData.sightingDate}</p>
      </div>
    </div>
  );
};

export default CardPost;
