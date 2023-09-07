import PostData from "../../models/PostData";
import shareIcon from "../../assets/share_icon.png";
import postIcon from "../../assets/post_icon.png";
import { convertLikesToString } from "../../utils/LikeConversion";
import "./CardPost.scss";

interface PostDataProps {
  postData: PostData;
  openModalAction: () => void;
}

const CardPost = ({ postData, openModalAction }: PostDataProps) => {
  return (
    <div className="CardPost">
      <div className="CardPost__banner">
        <div className="CardPost__banner__likes">
          <img src={postIcon} alt="whale icon" />
          <span>{convertLikesToString(postData.likes)}</span>
        </div>
        <div>
          <img src={shareIcon} alt="share post" />
        </div>
      </div>
      <img
        className="CardPost__image"
        src={postData.imageUrl}
        alt={`image of ${postData.species}`}
        onClick={openModalAction}
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
