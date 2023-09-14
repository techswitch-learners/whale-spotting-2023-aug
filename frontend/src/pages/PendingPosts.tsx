import { useState, useEffect } from "react";
import CardPost from "../components/Post/CardPost";
import Modal from "../components/UI/Modal";
import PendingPostModal from "../components/Post/PendingPostModal";
import PostData from "../models/PostData";
import { getAllPendingPosts } from "../clients/backendApiClient";
import WhaleLoader from "../components/UI/WhaleLoader";
import "./PendingPosts.scss";

export const PendingPosts = () => {
  const [selectedPostDetails, setSelectedPostDetails] = useState<PostData>();
  const [postData, setPostData] = useState<PostData[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchPendingPosts = async () => {
    const posts = (await getAllPendingPosts()).posts;
    if (posts.length === 0) {
      setErrorMessage("You're all up to date!");
    } else {
      setPostData(posts);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPendingPosts();
  }, []);

  return (
    <main>
      <h1>Posts Awaiting Approval</h1>
      {!isLoading && postData ? (
        <>
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
              <PendingPostModal postData={selectedPostDetails} />
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

export default PendingPosts;
