import { useState, useEffect } from "react";
import { getAllUsers } from "../clients/backendApiClient";
import CardUser from "../components/User/CardUser";
import UsersData from "../models/UsersData";
import "../components/Post/CardPost.scss";

export const Users = () => {
  const [usersData, setUsersData] = useState<UsersData>();

  useEffect(() => {
    getAllUsers().then(setUsersData);
  }, []);

  return (
    <main>
      <h1>All users</h1>
      <section className="Section-Two">
        <div className="container PostsGallery">
          {usersData?.users.map((user) => {
            return <CardUser user={user} />;
          })}
        </div>
      </section>
    </main>
  );
};

export default Users;
