import { convertLikesToString } from "../../util/LikeConversion";
import { PostData } from "../../pages/Posts";

import "./FeaturedPost.scss";

interface PostDataProps {
  postData: PostData;
}

const FeaturedPost = ({ postData }: PostDataProps) => {
  return (
    <div className="FeaturedPost">
      <img
        className="FeaturedPost__image"
        src={postData.imageUrl}
        alt={`image of ${postData.species}`}
      />
      <div className="FeaturedPost__content">
        <div className="FeaturedPost__info">
          <p className="FeaturedPost__title">{postData.species}</p>
          <p className="FeaturedPost__text">{postData.sightingDate}</p>
        </div>
        <div className="FeaturedPost__user">
          <div className="FeaturedPost__user__image-container">
            <img
              className="FeaturedPost__user__image"
              src="https://itsnotacareer.files.wordpress.com/2021/12/for-profile.jpg?w=816"
              alt={`${postData.username}'s profile picture`}
            />
          </div>
          <p className="FeaturedPost__text">{postData.username}</p>
        </div>
        <div className="FeaturedPost__interactions">
          <div className="FeaturedPost__interactions__likes">
            <img src="/post_icon.png" alt="whale icon" />
            <span>{convertLikesToString(postData.likes)}</span>
          </div>
          <div>
            <img src="/share_icon.png" alt="share post" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPost;
