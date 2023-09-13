import { useEffect, useState } from "react";
import { getLatestPosts } from "../../clients/backendApiClient";
import PostData from "../../models/PostData";
import { toShortDate } from "../../utils/DateConversion";
import "./LatestPosts.scss";

export default function LatestPosts() {
  const [latestPosts, setLatestPosts] = useState<PostData[]>();

  const getLatestPostsHandler = async () => {
    const response = await getLatestPosts();
    if (response) {
      setLatestPosts(response);
    }
  };

  useEffect(() => {
    getLatestPostsHandler();
  }, []);

  return (
    <section className="LatestPosts section-dark">
      <div className="container">
        <h2>Latest Spottings</h2>
        <h4>Explore the latest sightings</h4>
        <div className="LatestPostsRow">
          {latestPosts &&
            latestPosts.map((post) => {
              return (
                <div key={post.id} className="LatestPostCard">
                  <div className="LatestPostCard_ImgContainer">
                    <img
                      className="LatestPostCard__ImgContainer__Img"
                      src={post.imageUrl}
                      alt={`Image of ${post.species.name}`}
                    />
                  </div>
                  <p>Spotter: {post.user.name}</p>
                  <p>Date : {toShortDate(post.timestamp)}</p>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
