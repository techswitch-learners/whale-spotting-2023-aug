import { useState } from "react";
import CardPost from "../../components/Post/CardPost";
import Modal from "../../components/UI/Modal";
import CardPostModal from "../../components/Post/CardPostModal";
import PostData from "../../models/PostData";
import UserData from "../../models/UserData";
import "./UserPosts.scss";

interface UserPostsProps {
  user: UserData;
}

export const UserPosts = ({ user }: UserPostsProps) => {
  const [selectedPostDetails, setSelectedPostDetails] = useState<PostData>();

  return (
    <main>
      <h1>Posts</h1>
      {user.posts && user.posts.length > 0 ? (
        <>
          <section>
            <div className="container PostsGallery">
              {user.posts.map((post) => {
                return <CardPost postData={post} />;
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
    </main>
  );
};

export default UserPosts;
