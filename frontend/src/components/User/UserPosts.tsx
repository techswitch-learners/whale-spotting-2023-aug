import { useEffect, useState } from "react";
import CardPost from "../../components/Post/CardPost";
import Modal from "../../components/UI/Modal";
import CardPostModal from "../../components/Post/CardPostModal";
import PostData from "../../models/PostData";
import "./UserPosts.scss";

interface UserPostsProps {
  posts: PostData[];
  onPostLike: (postId: number) => void;
}

export const UserPosts = ({ posts, onPostLike }: UserPostsProps) => {
  const [selectedPostDetails, setSelectedPostDetails] = useState<PostData>();

  useEffect(() => {
    if (selectedPostDetails) {
      const selectedPostData = posts?.find(
        (post) => post.id === selectedPostDetails.id,
      );
      if (
        selectedPostDetails.interactionCount !==
        selectedPostData?.interactionCount
      ) {
        setSelectedPostDetails(selectedPostData);
      }
    }
  }, [posts, selectedPostDetails]);

  return (
    <main>
      <h1>Posts</h1>
      {posts && posts.length > 0 ? (
        <>
          <section>
            <div className="container PostsGallery">
              {posts.map((post) => {
                return (
                  <CardPost
                    postData={post}
                    openModalAction={() => setSelectedPostDetails(post)}
                    onPostLike={onPostLike}
                  />
                );
              })}
            </div>
          </section>

          {selectedPostDetails && (
            <Modal closeAction={() => setSelectedPostDetails(undefined)}>
              <CardPostModal
                postData={selectedPostDetails}
                onPostLike={onPostLike}
              />
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
    </main>
  );
};

export default UserPosts;
