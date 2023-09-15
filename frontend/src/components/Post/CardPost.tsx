import PostData from "../../models/PostData";
import { toShortDate } from "../../utils/DateConversion";
import ShareButtonExpandable from "../ShareButtonExpandable";
import postIcon from "../../assets/post_icon.png";
import { convertLikesToString } from "../../utils/LikeConversion";
import { Link } from "react-router-dom";
import "./CardPost.scss";

interface PostDataProps {
  postData: PostData;
}

const CardPost = ({ postData }: PostDataProps) => {
  return (
    <div className="CardPost">
      <div className="CardPost__banner">
        <div className="CardPost__banner__likes">
          <img src={postIcon} alt="whale icon" />
          <span>{convertLikesToString(postData.likes)}</span>
        </div>
        <div>
          <ShareButtonExpandable
            postData={postData}
            size={24}
            type={"sighting"}
          />
        </div>
      </div>
      <Link to={`/posts/${postData.id}`}>
        <img
          className="CardPost__image"
          src={postData.imageUrl}
          alt={`image of ${postData.species.name}`}
        />
        <div className="CardPost__info">
          <p className="CardPost__title">{postData.species.name}</p>
          <p className="CardPost__text">{postData.user.name}</p>
          <p className="CardPost__text">{toShortDate(postData.timestamp)}</p>
        </div>
      </Link>
    </div>
  );
};

export default CardPost;
