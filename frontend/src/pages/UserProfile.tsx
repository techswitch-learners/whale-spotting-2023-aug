// import { useState } from "react";
import "./UserProfile.scss";

function UserProfile() {
  const hardcodedUserInfo = {
    name: "Anthony Wilson",
    email: "anthony.whale@gmail.com",
    memberSince: "17th July 2222",
    userName: "whalelover123",
    profileImageUrl:
      "https://t3.ftcdn.net/jpg/00/88/76/06/360_F_88760637_XGc6SZe1IsXRKTrqYa0Vr2lOintmCYzZ.jpg",
    ranking: 5,
  };

  //   const userInfo = useState(hardcodedUserInfo);
  //   const [loading, setLoading] = useState(false);

  return (
    <div className="user-page container">
      <p>
        <img
          src={hardcodedUserInfo.profileImageUrl}
          alt="{hardcodedUserInfo.name}'s profile picture"
          className="profileimage"
        />
      </p>
      <h1>{hardcodedUserInfo.userName}</h1>
      <p className="spacefiller"></p>
      <div className="user-info container">
        <p>Name: {hardcodedUserInfo.name}</p>
        <p>Email: {hardcodedUserInfo.email}</p>
        <p>Member since: {hardcodedUserInfo.memberSince}</p>
        <p>Whale Expertise: {hardcodedUserInfo.ranking} </p>
      </div>
      {}
    </div>
  );
}

export default UserProfile;
