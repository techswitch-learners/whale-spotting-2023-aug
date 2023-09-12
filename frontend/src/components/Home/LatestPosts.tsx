import { useEffect, useState } from "react";
import { getLatestPosts } from "../../clients/backendApiClient";
import { NewPostData } from "../../models/NewPostData";
import "./LatestPosts.scss";

export default function LatestPosts() {
  const [latestPosts, setLatestPosts] = useState<NewPostData[]>();

  const getLatestPostsHandler = async () => {
    const response = await getLatestPosts();
    if (response) {
      setLatestPosts(response);
      console.log(response);
    }
  };

  useEffect(() => {
    getLatestPostsHandler();
  }, []);

  function formatDate(timestamp: string) {
    const date = Date.parse(timestamp);
    const newDateFormat = new Date(date);
    return newDateFormat.toLocaleDateString();
  }

  return (
    <section className="LatestPosts section-dark">
      <div className="container">
        <h2>Latest Spottings</h2>
        <h4>Explore the latest sightings</h4>
        <div className="LatestPostsRow">
          {latestPosts &&
            latestPosts.map((post) => {
              return (
                <div className="LatestPostCard">
                  <div className="LatestPostCard_ImgContainer">
                    <img
                      className="LatestPostCard__ImgContainer__Img"
                      src={post.imageUrl}
                      alt={`Image of ${post.species.name}`}
                    />
                  </div>
                  <p>Spotter: {post.user.name}</p>
                  <p>Date : {formatDate(post.timestamp)}</p>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
