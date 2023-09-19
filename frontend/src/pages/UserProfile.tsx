import { useState, useEffect, useCallback, useContext } from "react";
import UserData from "../models/UserData";
import { getUserById, interactWithPost } from "../clients/backendApiClient";
import { useParams } from "react-router-dom";
import WhaleLoader from "../components/UI/WhaleLoader";
import Button from "../components/UI/Button";
import UserPosts from "../components/User/UserPosts";

import "./UserProfile.scss";
import { LoginContext } from "../context/LoginManager";

export const UserProfile = () => {
  const [user, setUser] = useState<UserData>();
  const [loading, setLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [otherError, setOtherError] = useState<boolean>(false);
  const loginContext = useContext(LoginContext);

  const { userId } = useParams<{ userId: string }>();

  const onLikeHandler = async (postId: number) => {
    if (loginContext.isLoggedIn) {
      const interactionResult = await interactWithPost(
        postId,
        loginContext.encodedAuth,
      );
      if (interactionResult) {
        const updatedPosts = user?.posts?.map((post) => {
          return post.id == postId
            ? {
                ...post,
                hasInteractionFromCurrentUser: true,
                interactionCount: post.interactionCount + 1,
              }
            : post;
        });
        if (updatedPosts && user) {
          setUser({ ...user, posts: updatedPosts });
        }
      }
    }
  };

  const fetchUser = useCallback(async () => {
    setNotFound(false);
    setOtherError(false);
    setUser(undefined);

    if (userId && !isNaN(parseInt(userId))) {
      setLoading(true);
      await getUserById(parseInt(userId), loginContext.encodedAuth)
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
  }, [userId, loginContext.encodedAuth]);

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
            <UserPosts posts={user.posts} onPostLike={onLikeHandler} />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserProfile;
