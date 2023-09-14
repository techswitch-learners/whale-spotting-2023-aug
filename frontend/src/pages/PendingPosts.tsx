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
  const [posts, setPosts] = useState<PostData[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchPendingPosts = async () => {
    await getAllPendingPosts()
      .then((postsData) => {
        setPosts(postsData.posts);
        if (postsData.posts.length === 0) {
          setMessage("You're all up to date!");
        } else {
          setMessage("");
        }
      })
      .catch(() => setMessage("Can't load posts at this time..."));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPendingPosts();
  }, []);

  return (
    <main>
      <h1>Posts Awaiting Approval</h1>
      {!isLoading && posts ? (
        <>
          <section>
            <div className="container PostsGallery">
              {posts.map((post) => {
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
          message={isLoading ? "loading" : message}
        />
      )}
    </main>
  );
};

export default PendingPosts;
