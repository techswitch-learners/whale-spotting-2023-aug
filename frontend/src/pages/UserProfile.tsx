import { useState, useEffect, useCallback } from "react";
import UserData from "../models/UserData";
import { getUserById } from "../clients/backendApiClient";
import { useParams } from "react-router-dom";
import WhaleLoader from "../components/UI/WhaleLoader";
import Button from "../components/UI/Button";
import "./UserProfile.scss";
import UserPosts from "../components/User/UserPosts";

export const UserProfile = () => {
  const [user, setUser] = useState<UserData>();
  const [loading, setLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [otherError, setOtherError] = useState<boolean>(false);

  const { userId } = useParams<{ userId: string }>();

  const fetchUser = useCallback(async () => {
    setNotFound(false);
    setOtherError(false);
    setUser(undefined);

    if (userId && !isNaN(parseInt(userId))) {
      setLoading(true);
      await getUserById(parseInt(userId))
        .then((response) => {
          if (response.ok) {
            response.json().then(setUser);
          } else {
            setNotFound(true);
          }
        })
        .catch(() => {
          setOtherError(true);
        });
      setLoading(false);
    } else {
      setNotFound(true);
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (loading || notFound || otherError) {
    return (
      <main>
        <section className="section-dark">
          <div className="container Posts__loader">
            <WhaleLoader
              isLoading={loading}
              message={
                loading
                  ? "Loading..."
                  : notFound
                  ? "That user doesn't seem to exist."
                  : "Couldn't fetch user at this time."
              }
            />
            {otherError && <Button onClick={fetchUser}>Try Again</Button>}
          </div>
        </section>
      </main>
    );
  }

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
            <UserPosts userId={user.id} />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserProfile;
