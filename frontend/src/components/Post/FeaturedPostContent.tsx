import { convertLikesToString } from "../../utils/LikeConversion";
import PostData from "../../models/PostData";
import shareIcon from "../../assets/share_icon.png";
import postIcon from "../../assets/post_icon.png";

import "./FeaturedPostContent.scss";
import Button from "../UI/Button";

interface PostDataProps {
  postData: PostData;
  openModalAction: () => void;
}

const FeaturedPostContent = ({ postData, openModalAction }: PostDataProps) => {
  return (
    <>
      <div className="FeaturedPostContent__heading">
        <h3 className="FeaturedPostContent__heading__title">
          {postData.species}
        </h3>
        <p className="FeaturedPostContent__heading__bodyofwater">
          South Atlantic
        </p>
        <p className="FeaturedPostContent__heading__date">03/09/23</p>
      </div>
      <p className="FeaturedPostContent__description">
        Whales are a widely distributed and diverse group of fully aquatic
        placental marine mammals. As an informal and colloquial grouping, they
        correspond to large members of the infraorder Cetacea, i.e. all
        cetaceans apart from dolphins and porpoises. Dolphins and porpoises may
        be considered whales from a formal, cladistic perspective. Whales,
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
        whales), as well as the six families of dolphins and porpoises which are
        not considered whales in the informal sense.
      </p>
      <div className="FeaturedPostContent__sub-section">
        <Button
          className="FeaturedPostContent__view-more"
          onClick={openModalAction}
        >
          View
        </Button>
        <div className="FeaturedPostContent__user">
          <p className="FeaturedPostContent__text">{postData.username}</p>
          <div className="FeaturedPostContent__user__image-container">
            <img
              className="FeaturedPostContent__user__image"
              src="https://itsnotacareer.files.wordpress.com/2021/12/for-profile.jpg?w=816"
              alt={`${postData.username}'s profile picture`}
            />
          </div>
        </div>
      </div>

      <div className="FeaturedPostContent__interactions">
        <div className="FeaturedPostContent__interactions__likes">
          <img src={postIcon} alt="whale icon" />
          <span>{convertLikesToString(postData.likes)}</span>
        </div>
        <div>
          <img src={shareIcon} alt="share post" />
        </div>
      </div>
    </>
  );
};

export default FeaturedPostContent;
