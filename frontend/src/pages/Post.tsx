import { convertLikesToString } from "../utils/LikeConversion";
import PostData from "../models/PostData";
import { toShortDate } from "../utils/DateConversion";
import postIcon from "../assets/post_icon.png";
import fullscreenIcon from "../assets/fullscreen_icon.svg";
import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById } from "../clients/backendApiClient";
import "./Post.scss";
import WhaleLoader from "../components/UI/WhaleLoader";
import Button from "../components/UI/Button";
import ShareButtonExpandable from "../components/ShareButtonExpandable";

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
    <div className="CardPostModal-container">
      {post ? (
        <div className="CardPostModal">
          <div className="CardPostModal__image__container">
            <img
              className="CardPostModal__image"
              src={post.imageUrl}
              alt={`image of ${post.species.name}`}
            />
            <a href={post.imageUrl} target="_blank">
              <img
                className="CardPostModal__fullscreen"
                src={fullscreenIcon}
                alt="Show image fullscreen"
              />
            </a>
          </div>

          <div className="CardPostModal__content">
            <div className="CardPostModal__heading">
              <h3 className="CardPostModal__heading__title">
                {post.species.name}
              </h3>
              <p className="CardPostModal__heading__bodyofwater">
                {post.bodyOfWater.name}
              </p>
              <p className="CardPostModal__heading__date">
                {toShortDate(post.timestamp)}
              </p>
            </div>
            <p className="CardPostModal__description">{post.description}</p>
            <div className="CardPostModal__user">
              <p className="CardPostModal__text">{post.user.name}</p>
              <div className="CardPostModal__user__image-container">
                <img
                  className="CardPostModal__user__image"
                  src={post.user.profileImageUrl}
                  alt={`${post.user.name}'s profile picture`}
                />
              </div>
            </div>
            <div className="CardPostModal__interactions">
              <div className="CardPostModal__interactions__likes">
                <img src={postIcon} alt="whale icon" />
                <span>{convertLikesToString(post.rating)}</span>
              </div>
              <div>
                <ShareButtonExpandable postData={post} size={36} />
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
