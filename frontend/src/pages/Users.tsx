import { useState, useEffect } from "react";
import { getAllUsers } from "../clients/backendApiClient";
import CardUser from "../components/User/CardUser";
import UsersData from "../models/UsersData";
import WhaleLoader from "../components/UI/WhaleLoader";
import Button from "../components/UI/Button";
import "./Users.scss";

export const Users = () => {
  const [usersData, setUsersData] = useState<UsersData>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchUsers = async () => {
    setLoading(true);
    setError(false);
    await getAllUsers()
      .then((data) => {
        setUsersData(data);
      })
      .catch(() => {
        setError(true);
      });
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading || error) {
    return (
      <main>
        <h1>Search for Users</h1>
        <section className="section-dark">
          <div className="container Users__loader">
            <WhaleLoader
              isLoading={loading}
              message={
                loading ? "Loading..." : "Couldn't fetch users at this time."
              }
            />
            {error && <Button onClick={fetchUsers}>Try Again</Button>}
          </div>
        </section>
      </main>
    );
  }

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
