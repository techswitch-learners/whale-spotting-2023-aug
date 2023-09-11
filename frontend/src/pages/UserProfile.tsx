import { useState, useEffect } from "react";
import UserData from "../models/UserData";
import { GetById } from "../clients/backendApiClient";
import { useParams } from "react-router-dom";
import "./UserProfile.scss";

export const UserProfile = () => {
  const [userProfile, setUserProfile] = useState<UserData>();
  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    if (userId) {
      GetById(parseInt(userId)).then(setUserProfile);
    }
  }, [userId]);

  return (
    <div>
      {userProfile ? (
        <div className="user-page container">
          <div className="Namepic container">
            <img
              src={userProfile.profileImageUrl}
              alt={`${userProfile.name}'s profile picture`}
              className="profileimage"
            />
            <h1>{userProfile.username}</h1>
          </div>
          <div className="user-info container">
            <p className="user-fullname">Name: {userProfile.name}</p>
            <p className="user-">Email: {userProfile.email}</p>
          </div>
          <div className="user-posts container">
            <ul>
              {userProfile &&
                userProfile.posts.map((post) => {
                  return (
                    <li>
                      <img
                        src={post.imageUrl}
                        alt={`${userProfile.name}'s post picture`}
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
