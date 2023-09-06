import { PostData } from "../../pages/Posts";
import { convertLikesToString } from "../../util/LikeConversion";
import "./CardPost.scss";

interface PostDataProps {
  postData: PostData;
}

const CardPost = ({ postData }: PostDataProps) => {
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
