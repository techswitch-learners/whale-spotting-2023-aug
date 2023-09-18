import PostData from "../../models/PostData";
import { toShortDate } from "../../utils/DateConversion";
import "./Postcard.scss";

interface PostDataProps {
  postData: PostData;
}

const Postcard = ({ postData }: PostDataProps) => {
  return (
    <div className="PostcardContainer">
      <div className="PostcardContainer__imagecontainer">
        <img
          className="PostcardContainer__imagecontainer__image"
          src={postData.imageUrl}
          alt={`image of ${postData.species.name}`}
        />
        <div className="PostcardContainer__heading">
          <h3 className="PostcardContainer__heading__title">
            {postData.species.name}
          </h3>
          <p className="PostcardContainer__heading__bodyofwater">
            {postData.bodyOfWater.name}
          </p>
          <p className="PostcardContainer__heading__date">
            {toShortDate(postData.creationTimestamp)}
          </p>
        </div>
      </div>
      <div className="PostcardContainer__content">
        <div className="PostcardContainer__content__stamp"></div>
        <p className="PostcardContainer__content__description">
          {postData.description}
        </p>
      </div>
    </div>
  );
};

export default Postcard;
