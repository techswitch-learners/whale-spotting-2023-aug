import PostData from "../../models/PostData";
import { toShortDate } from "../../utils/DateConversion";
import shareIcon from "../../assets/share_icon.png";
import postIcon from "../../assets/post_icon.png";
import { convertLikesToString } from "../../utils/LikeConversion";
import { Link } from "react-router-dom";
import "./CardPost.scss";

interface PostDataProps {
  postData: PostData;
  openModalAction: () => void;
}

const CardPost = ({ postData, openModalAction }: PostDataProps) => {
  return (
    <Link to={`/posts/${postData.id}`}>
      <div className="CardPost">
        <div className="CardPost__banner">
          <div className="CardPost__banner__likes">
            <img src={postIcon} alt="whale icon" />
            <span>{convertLikesToString(postData.rating)}</span>
          </div>
          <div>
            <img src={shareIcon} alt="share post" />
          </div>
        </div>
        <img
          className="CardPost__image"
          src={postData.imageUrl}
          alt={`image of ${postData.species.name}`}
          onClick={openModalAction}
        />
        <div className="CardPost__info">
          <p className="CardPost__title">{postData.species.name}</p>
          <p className="CardPost__text">{postData.user.name}</p>
          <p className="CardPost__text">{toShortDate(postData.timestamp)}</p>
        </div>
      </div>
    </Link>
  );
};

export default CardPost;
