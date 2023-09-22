import PostData from "../../models/PostData";
import { toShortDate } from "../../utils/DateConversion";
import Button from "../UI/Button";
import InteractWithPost from "./InteractWithPost";
import ShareButtonExpandable from "../ShareButtonExpandable";
import { Link } from "react-router-dom";
import "./FeaturedPostContent.scss";

interface PostDataProps {
  postData: PostData;
  openModalAction: () => void;
  likePost: (postId: number) => void;
}

const FeaturedPostContent = ({
  postData,
  openModalAction,
  likePost,
}: PostDataProps) => {
  return (
    <>
      <div className="FeaturedPostContent__heading">
        <h3 className="FeaturedPostContent__heading__title">
          {postData.species.name}
        </h3>
        {postData.bodyOfWater && (
          <p className="FeaturedPostContent__heading__bodyofwater">
            {postData.bodyOfWater.name}
          </p>
        )}
        <p className="FeaturedPostContent__heading__date">
          {toShortDate(postData.creationTimestamp)}
        </p>
      </div>
      <p className="FeaturedPostContent__description">{postData.description}</p>
      <div className="FeaturedPostContent__sub-section">
        <Button
          className="FeaturedPostContent__view-more"
          onClick={openModalAction}
        >
          View
        </Button>
        <Link to={`/users/${postData.user.id}`}>
          <div className="FeaturedPostContent__user">
            <p className="FeaturedPostContent__text">{postData.user.name}</p>
            <div className="FeaturedPostContent__user__image-container">
              <img
                className="FeaturedPostContent__user__image"
                src={postData.user.profileImageUrl}
                alt={`${postData.user.name}'s profile picture`}
              />
            </div>
          </div>
        </Link>
      </div>

      <div className="FeaturedPostContent__interactions">
        <div className="FeaturedPostContent__interactions__likes">
          <InteractWithPost
            postId={postData.id}
            interactionCount={postData.interactionCount}
            hasInteractionFromCurrentUser={
              postData.hasInteractionFromCurrentUser
            }
            likePost={likePost}
          />
        </div>
        <div>
          <ShareButtonExpandable
            postData={postData}
            size={36}
            type={"sighting"}
          />
        </div>
      </div>
    </>
  );
};

export default FeaturedPostContent;
