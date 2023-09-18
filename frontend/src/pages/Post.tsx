import { convertLikesToString } from "../utils/LikeConversion";
import PostData from "../models/PostData";
import { toShortDate } from "../utils/DateConversion";
import postIcon from "../assets/post_icon.png";
import fullscreenIcon from "../assets/fullscreen_icon.svg";
import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById } from "../clients/backendApiClient";
import WhaleLoader from "../components/UI/WhaleLoader";
import Button from "../components/UI/Button";
import ShareButtonExpandable from "../components/ShareButtonExpandable";
import "./Post.scss";

const Post = () => {
  const [post, setPost] = useState<PostData>();
  const [loading, setLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [otherError, setOtherError] = useState<boolean>(false);

  const { postId } = useParams<{ postId: string }>();

  const fetchPost = useCallback(async () => {
    setNotFound(false);
    setOtherError(false);
    setPost(undefined);

    if (postId && !isNaN(parseInt(postId))) {
      setLoading(true);
      await getPostById(parseInt(postId))
        .then((response) => {
          if (response.ok) {
            response.json().then(setPost);
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
  }, [postId]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const navigate = useNavigate();
  const routeChange = () => {
    const path = "../posts";
    navigate(path);
  };

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
                  ? "That post doesn't seem to exist."
                  : "Couldn't fetch post at this time."
              }
            />
            {otherError && <Button onClick={fetchPost}>Try Again</Button>}
          </div>
        </section>
      </main>
    );
  }
  return (
    <div className="Post-container">
      {post ? (
        <div className="Post">
          <div className="Post__image__container">
            <img
              className="Post__image"
              src={post.imageUrl}
              alt={`image of ${post.species.name}`}
            />
            <a href={post.imageUrl} target="_blank">
              <img
                className="Post__fullscreen"
                src={fullscreenIcon}
                alt="Show image fullscreen"
              />
            </a>
          </div>

          <div className="Post__content">
            <div className="Post__heading">
              <h3 className="Post__heading__title">{post.species.name}</h3>
              <p className="Post__heading__bodyofwater">
                {post.bodyOfWater.name}
              </p>
              <p className="Post__heading__date">
                {toShortDate(post.timestamp)}
              </p>
            </div>
            <p className="Post__description">{post.description}</p>
            <div className="Post__user">
              <p className="Post__text">{post.user.name}</p>
              <div className="Post__user__image-container">
                <img
                  className="Post__user__image"
                  src={post.user.profileImageUrl}
                  alt={`${post.user.name}'s profile picture`}
                />
              </div>
            </div>
            <div className="Post__interactions">
              <div className="Post__interactions__likes">
                <img src={postIcon} alt="whale icon" />
                <span>{convertLikesToString(post.rating)}</span>
              </div>
              <div>
                <ShareButtonExpandable
                  postData={post}
                  size={36}
                  type={"sighting"}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <div className="posts-button-wrapper">
        <Button onClick={routeChange}>See All Posts</Button>
      </div>
    </div>
  );
};

export default Post;
