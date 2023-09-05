import { parseLikes } from "../../util/parses";
import { PostData } from "../../pages/Posts";

import "./FeaturedPost.scss";

interface PostDataProps {
  postData: PostData;
}

const FeaturedPost = ({ postData }: PostDataProps) => {
  return (
    <div className="FeaturedPost">
      <div className="FeaturedPost__banner">
        <div className="FeaturedPost__banner__likes">
          <img src="/post_icon.png" alt="whale icon" />
          <span>{parseLikes(postData.likes)}</span>
        </div>
        <div>
          <img src="/share_icon.png" alt="share post" />
        </div>
      </div>
      <img
        className="FeaturedPost__image"
        src={postData.imageUrl}
        alt={`image of ${postData.species}`}
      />
      <div className="FeaturedPost__info">
        <p className="FeaturedPost__title">{postData.species}</p>
        <p className="FeaturedPost__text">{postData.username}</p>
        <p className="FeaturedPost__text">{postData.sightingDate}</p>
      </div>
    </div>
  );
};

export default FeaturedPost;
