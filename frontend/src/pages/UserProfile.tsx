import { useState, useEffect } from "react";
import "./UserProfile.scss";
import UserData from "../models/UserData";
import { GetById } from "../clients/backendApiClient";

export const UserProfile = () => {
  const [userProfile, setUserProfile] = useState<UserData>();

  const fetchUserProfile = async () => {
    const profile = await GetById(1); // need to amend hardcode
    setUserProfile(profile);
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div>
      {userProfile ? (
        <div className="user-page container">
          <div className="Namepic container">
            <img
              src={userProfile.profileImageUrl}
              alt="{hardcodedUserInfo.name}'s profile picture"
              className="profileimage"
            />
            <h1>{userProfile.username}</h1>
          </div>
          <div className="user-info container">
            <p className="user-fullname">Name: {userProfile.name}</p>
            <p className="user-">Email: {userProfile.email}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserProfile;
