import PostData from "../../models/PostData";
import { toShortDate } from "../../utils/DateConversion";
import firstClassStamp from "../../assets/Stamp_1st_Class.png";
import secondClassStamp from "../../assets/Stamp_2nd_Class.png";
import "./Postcard.scss";
import { useEffect, useState } from "react";

interface PostDataProps {
  postData: PostData;
}
const stamps = [firstClassStamp, secondClassStamp];
const random = Math.round(Math.random());

const Postcard = ({ postData }: PostDataProps) => {
  const [stamp, setStamp] = useState(stamps[Math.round(Math.random())]);

  useEffect(() => {
    setStamp(stamps[Math.round(Math.random())]);
  }, []);

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
        <img
          className="PostcardContainer__content__stamp"
          src={stamp}
          onClick={() => setStamp(random == 1 ? stamps[0] : stamps[1])}
        />
        <label>
          <input
            className="PostcardContainer__content__message"
            type="text"
            name="From"
          />
        </label>
      </div>
    </div>
  );
};

export default Postcard;
