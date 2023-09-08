import UserData from "../../models/UserData";
import "../Post/CardPost.scss";

interface UserDataProps {
  userData: UserData;
}

const CardUser = ({ userData }: UserDataProps) => {
  return (
    <div className="CardPost">
      <img
        className="CardPost__image"
        src={userData.profileImageUrl}
        alt={`image of ${userData.name}`}
      />
      <div className="CardPost__info">
        <p className="CardPost__title">{userData.name}</p>
        <p className="CardPost__text">{userData.username}</p>
      </div>
    </div>
  );
};

export default CardUser;
