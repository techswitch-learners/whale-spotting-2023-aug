import { useEffect, useState } from "react";
import { getLatestPosts } from "../../clients/backendApiClient";
import PostData from "../../models/PostData";
import { toShortDate } from "../../utils/DateConversion";
import WhaleLoader from "../UI/WhaleLoader";
import { Link } from "react-router-dom";
import "./LatestPosts.scss";

export default function LatestPosts() {
  const [latestPosts, setLatestPosts] = useState<PostData[]>();
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    getLatestPosts()
      .then(setLatestPosts)
      .catch(() => setError(true));
  }, []);

  return (
    <section className="LatestPosts section-dark">
      <div className="container">
        <h2>Latest Spottings</h2>
        <h3 className="sub-heading">Explore the latest sightings</h3>
        <div className="LatestPostsRow">
          {latestPosts ? (
            latestPosts.map((post) => {
              return (
                <Link to={`/posts/${post.id}`}>
                  <div key={post.id} className="LatestPostCard">
                    <div className="LatestPostCard_ImgContainer">
                      <img
                        className="LatestPostCard__ImgContainer__Img"
                        src={post.imageUrl}
                        alt={`Image of ${post.species.name}`}
                      />
                    </div>
                    <p>Spotter: {post.user.name}</p>
                    <p>Date : {toShortDate(post.creationTimestamp)}</p>
                  </div>
                </Link>
              );
            })
          ) : (
            <WhaleLoader
              isLoading={!error}
              message={
                error ? "Could not load posts at this time" : "Loading..."
              }
            />
          )}
        </div>
      </div>
    </section>
  );
}
