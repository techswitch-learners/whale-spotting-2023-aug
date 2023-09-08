import { useState, useEffect } from "react";
import CardPost from "../components/Post/CardPost";
import Modal from "../components/UI/Modal";
import CardPostModal from "../components/Post/CardPostModal";
import PostData from "../models/PostData";
import FeaturedPostContent from "../components/Post/FeaturedPostContent";
import FeaturedFrame from "../components/UI/FeaturedFrame";
import { getAllPosts } from "../clients/backendApiClient";
import WhaleLoader from "../components/UI/WhaleLoader";
import "./Posts.scss";

export const Posts = () => {
  const [selectedPostDetails, setSelectedPostDetails] = useState<PostData>();
  const [postData, setPostData] = useState<PostData[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchPosts = async () => {
    const posts = await getAllPosts();
    if (posts.length === 0) {
      setErrorMessage("Unable to retrieve posts");
    } else {
      setPostData(posts);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <main>
      <h1>Sightings</h1>
      {!isLoading && postData ? (
        <>
          <section className="section-dark">
            <div className="container">
              <h2>Featured Sighting</h2>
              <FeaturedFrame imageUrl={postData[0].imageUrl}>
                <FeaturedPostContent
                  postData={postData[0]}
                  openModalAction={() => setSelectedPostDetails(postData[0])}
                />
              </FeaturedFrame>
            </div>
          </section>

          <section>
            <div className="container PostsGallery">
              {postData.map((post) => {
                return (
                  <CardPost
                    postData={post}
                    openModalAction={() => setSelectedPostDetails(post)}
                  />
                );
              })}
            </div>
          </section>

          {selectedPostDetails && (
            <Modal closeAction={() => setSelectedPostDetails(undefined)}>
              <CardPostModal postData={selectedPostDetails} />
            </Modal>
          )}
        </>
      ) : (
        <WhaleLoader
          isLoading={isLoading}
          message={isLoading ? "loading" : errorMessage}
        />
      )}
    </main>
  );
};

export default Posts;
