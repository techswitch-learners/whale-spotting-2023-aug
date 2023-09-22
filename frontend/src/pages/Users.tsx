import { useState, useEffect } from "react";
import { getAllUsers } from "../clients/backendApiClient";
import CardUser from "../components/User/CardUser";
import UsersData from "../models/UsersData";
import WhaleLoader from "../components/UI/WhaleLoader";
import Button from "../components/UI/Button";
import "../components/Post/CardPost.scss";
import "./Users.scss";

export const Users = () => {
  const [usersData, setUsersData] = useState<UsersData>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    getAllUsers()
      .then((data) => {
        setUsersData(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
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
            {error && (
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            )}
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
