import { useState, useEffect } from "react";
import CardPost from "../components/Post/CardPost";
import PostData from "../models/PostData";
import FeaturedPostContent from "../components/Post/FeaturedPostContent";
import FeaturedFrame from "../components/UI/FeaturedFrame";
import { getAllPosts } from "../clients/backendApiClient";
import WhaleLoader from "../components/UI/WhaleLoader";
import FeaturedCarousel from "../components/UI/Carousel/FeaturedCarousel";
import Button from "../components/UI/Button";
import { Link } from "react-router-dom";
import "./Posts.scss";
import Modal from "../components/UI/Modal";
import CardPostModal from "../components/Post/CardPostModal";

export const Posts = () => {
  const [selectedPostDetails, setSelectedPostDetails] = useState<PostData>();
  const [postData, setPostData] = useState<PostData[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>();

  const fetchPosts = async () => {
    setIsLoading(true);
    setPostData(undefined);
    setErrorMessage(undefined);

    await getAllPosts()
      .then((data) => setPostData(data.posts))
      .catch(() => setErrorMessage("Unable to load posts"));

    setIsLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (isLoading || errorMessage) {
    return (
      <main>
        <section className="section-dark">
          <div className="container Posts__loader">
            <WhaleLoader
              isLoading={isLoading}
              message={isLoading ? "Loading..." : errorMessage}
            />
            {errorMessage && <Button onClick={fetchPosts}>Try Again</Button>}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <h1>Sightings</h1>
      {postData && postData.length > 0 ? (
        <>
          <section className="section-dark">
            <div className="container">
              <h2>Featured Sightings</h2>
              <FeaturedCarousel
                featuredItems={postData.slice(0, 5).map((post) => (
                  <FeaturedFrame imageUrl={post.imageUrl}>
                    <FeaturedPostContent
                      postData={post}
                      openModalAction={() => setSelectedPostDetails(post)}
                    />
                  </FeaturedFrame>
                ))}
              />
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
        <section className="section-dark">
          <div className="container">
            <h2 className="Posts__None__heading">No Posts Found</h2>
          </div>
        </section>
      )}
      <Link to="/posts/create" className="create-post-button">
        Create a Post
      </Link>
    </main>
  );
};

export default Posts;
