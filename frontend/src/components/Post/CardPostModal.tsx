// import { convertLikesToString } from "../../util/LikeConversion";
import { PostData } from "../../pages/Posts";

import "./CardPostModal.scss";

interface PostDataProps {
  postData: PostData;
}

const convertLikesToString = (likes: number) => {
  if (likes > 1000) {
    const thousands = Math.floor(likes / 1000);
    const hundreds = Math.floor((likes / 1000 - thousands) * 10);
    if (hundreds === 0) {
      return `${thousands}k`;
    } else {
      return `${thousands}.${hundreds}k`;
    }
  }
  return likes.toString();
};

const CardPostModal = ({ postData }: PostDataProps) => {
  return (
    <div className="CardPostModal">
      <img
        className="CardPostModal__image"
        src={postData.imageUrl}
        alt={`image of ${postData.species}`}
      />
      <div className="CardPostModal__content">
        <div className="CardPostModal__heading">
          <h3 className="CardPostModal__heading__title">{postData.species}</h3>
          <p className="CardPostModal__heading__bodyofwater">South Atlantic</p>
          <p className="CardPostModal__heading__date">03/09/23</p>
        </div>
        <p className="CardPostModal__description">
          Whales are a widely distributed and diverse group of fully aquatic
          placental marine mammals. As an informal and colloquial grouping, they
          correspond to large members of the infraorder Cetacea, i.e. all
          cetaceans apart from dolphins and porpoises. Dolphins and porpoises
          may be considered whales from a formal, cladistic perspective. Whales,
          dolphins and porpoises belong to the order Cetartiodactyla, which
          consists of even-toed ungulates. Their closest non-cetacean living
          relatives are the hippopotamuses, from which they and other cetaceans
          diverged about 54 million years ago. The two parvorders of whales,
          baleen whales (Mysticeti) and toothed whales (Odontoceti), are thought
          to have had their last common ancestor around 34 million years ago.
          Mysticetes include four extant (living) families: Balaenopteridae (the
          rorquals), Balaenidae (right whales), Cetotheriidae (the pygmy right
          whale), and Eschrichtiidae (the grey whale). Odontocetes include the
          Monodontidae (belugas and narwhals), Physeteridae (the sperm whale),
          Kogiidae (the dwarf and pygmy sperm whale), and Ziphiidae (the beaked
          whales), as well as the six families of dolphins and porpoises which
          are not considered whales in the informal sense.{" "}
        </p>
        <div className="CardPostModal__user">
          <p className="CardPostModal__text">{postData.username}</p>
          <div className="CardPostModal__user__image-container">
            <img
              className="CardPostModal__user__image"
              src="https://itsnotacareer.files.wordpress.com/2021/12/for-profile.jpg?w=816"
              alt={`${postData.username}'s profile picture`}
            />
          </div>
        </div>
        <div className="CardPostModal__interactions">
          <div className="CardPostModal__interactions__likes">
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

export default CardPostModal;
