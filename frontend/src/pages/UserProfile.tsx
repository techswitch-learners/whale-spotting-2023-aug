import { useState, useEffect } from "react";
import UserData from "../models/UserData";
import { getUserById } from "../clients/backendApiClient";
import { useParams } from "react-router-dom";
import "./UserProfile.scss";

export const UserProfile = () => {
  const [user, setUser] = useState<UserData>();
  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    if (userId) {
      getUserById(parseInt(userId)).then(setUser);
    }
  }, [userId]);

  return (
    <div>
      {user ? (
        <div className="user-page container">
          <div className="user-banner">
            <img
              src={user.profileImageUrl}
              alt={`${user.name}'s profile picture`}
              className="user-profile-image"
            />
            <h1>{user.username}</h1>
          </div>
          <div className="user-info">
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
          <div>
            <ul>
              {user &&
                user.posts.map((post) => {
                  return (
                    <li>
                      <img
                        src={post.imageUrl}
                        alt={`${user.name}'s post picture`}
                      />
                      <p>{post.description}</p>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserProfile;
