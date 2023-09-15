import { Link } from "react-router-dom";
import UserData from "../../models/UserData";
import "../Post/CardPost.scss";

interface CardUserProps {
  user: UserData;
}

const CardUser = ({ user }: CardUserProps) => {
  return (
    <Link to={`/users/${user.id}`}>
      <div className="CardPost">
        <img
          className="CardPost__image"
          src={user.profileImageUrl}
          alt={`image of ${user.name}`}
        />
        <div className="CardPost__info">
          <p className="CardPost__title">{user.name}</p>
          <p className="CardPost__text">{user.username}</p>
        </div>
      </div>
    </Link>
  );
};

export default CardUser;
