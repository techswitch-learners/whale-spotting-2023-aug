import { toShortDate } from "../../utils/DateConversion";
import { Link } from "react-router-dom";
import postIcon from "../../assets/post_icon.png";
import ShareButtonExpandable from "../ShareButtonExpandable";
import PostData from "../../models/PostData";
import "./SearchResultCard.scss";
import "../../components/ShareButtonExpandable.scss";

interface Props {
  post: PostData;
}

function SearchResultCard({ post }: Props) {
  return (
    <>
      <div className="SearchResultCard">
        <Link to={`/posts/${post.id}`}>
          <div className="SearchResultCard__Image">
            <img src={post.imageUrl} alt="" />
          </div>
        </Link>
        <div className="SearchResultCard__Descriptions">
          <p>{post.description.slice(0, 150)}...</p>
          <div className="SearchResultCard__Details">
            <div className="SearchResultCard__Details--left">
              <div>
                <img
                  className="SearchResultCard__Details--left--icon"
                  src={postIcon}
                  alt="whale icon"
                />
                <span>{post.rating}</span>
              </div>
            </div>
            <div className="SearchResultCard__Details--right">
              <ShareButtonExpandable
                postData={post}
                size={24}
                type={"sighting"}
              />
              <p>{toShortDate(post.timestamp)}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchResultCard;
