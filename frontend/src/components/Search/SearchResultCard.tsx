import PostData from "../../models/PostData";
import { toShortDate } from "../../utils/DateConversion";
import postIcon from "../../assets/post_icon.png";
import shareIcon from "../../assets/share_icon.png";

import "./SearchResultCard.scss";
import { Link } from "react-router-dom";

interface Props {
  post: PostData;
}

function SearchResultCard({ post }: Props) {
  return (
    <>
      <Link to={`/posts/${post.id}`}>
        <div className="SearchResultCard">
          <div className="SearchResultCard__Image">
            <img src={post.imageUrl} alt="" />
          </div>
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
                <div>
                  <img
                    className="SearchResultCard__Details--left--icon"
                    src={shareIcon}
                    alt="whale icon"
                  />
                </div>
              </div>
              <p>{toShortDate(post.timestamp)}</p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default SearchResultCard;
