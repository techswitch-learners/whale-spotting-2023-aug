import { PostData } from "../../pages/Posts";
import "./CardPost.scss";

interface PostDataProps {
  postData: PostData;
}

const CardPost = ({ postData }: PostDataProps) => {
  return (
    <div className="CardPost">
      <div className="CardPost__image">
        <img src={postData.imageUrl} alt={`image of ${postData.species}`} />
      </div>
      <div className="CardPost__info">
        <p className="CardPost__title">{postData.species}</p>
        <p className="CardPost__text">{postData.username}</p>
        <p className="CardPost__text">{postData.sightingDate}</p>
      </div>
    </div>
  );
};

export default CardPost;
