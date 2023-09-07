import { useState } from "react";
import CardPost from "../components/Post/CardPost";
import FeaturedPost from "../components/Post/FeaturedPost";
import "./Posts.scss";
import Modal from "../components/UI/Modal";
import CardPostModal from "../components/Post/CardPostModal";

export interface PostData {
  imageUrl: string;
  species: string;
  username: string;
  sightingDate: string;
  likes: number;
}

const postData: PostData[] = [
  {
    imageUrl:
      "https://hips.hearstapps.com/hmg-prod/images/where-to-go-whale-watching-virginia-1522419979.jpg?resize=1200:*",
    species: "Humpback",
    username: "Ariel",
    sightingDate: "04 September 2023",
    likes: 22100,
  },
  {
    imageUrl:
      "https://www.wildlifeworldwide.com/images/home/whale_watching_grey_baja.jpg",
    username: "Ariel",
    species: "humpback",
    sightingDate: "04 September 2023",
    likes: 22234,
  },
  {
    imageUrl:
      "https://hips.hearstapps.com/hmg-prod/images/where-to-go-whale-watching-virginia-1522419979.jpg?resize=1200:*",
    username: "Nemo",
    species: "humpback",
    sightingDate: "03 September 2023",
    likes: 22399,
  },
  {
    imageUrl:
      "https://www.wildlifeworldwide.com/images/home/whale_watching_grey_baja.jpg",
    username: "Aquaman",
    species: "humpback",
    sightingDate: "02 September 2023",
    likes: 22,
  },
  {
    imageUrl:
      "https://www.visitnsw.com/sites/visitnsw/files/styles/portrait_320x575/public/2022-05/174916.jpg?h=19ea9127&itok=tp2_HrNx",
    username: "Ariel",
    species: "humpback",
    sightingDate: "28 August 2023",
    likes: 224,
  },
  {
    imageUrl:
      "https://hips.hearstapps.com/hmg-prod/images/where-to-go-whale-watching-virginia-1522419979.jpg?resize=1200:*",
    username: "Ariel",
    species: "humpback",
    sightingDate: "28 August 2023",
    likes: 22022,
  },
  {
    imageUrl:
      "https://www.wildlifeworldwide.com/images/home/whale_watching_grey_baja.jpg",
    username: "Nemo",
    species: "humpback",
    sightingDate: "28 August 2023",
    likes: 22321,
  },
  {
    imageUrl:
      "https://hips.hearstapps.com/hmg-prod/images/where-to-go-whale-watching-virginia-1522419979.jpg?resize=1200:*",
    username: "Aquaman",
    species: "humpback",
    sightingDate: "28 August 2023",
    likes: 22321,
  },
];

export const Posts = () => {
  const [selectedPostDetails, setSelectedPostDetails] = useState<PostData>();

  const modalOpenHandler = (post: PostData) => {
    setSelectedPostDetails(post);
  };

  return (
    <main>
      <h1>Sightings</h1>
      <section className="section-dark">
        <div className="container">
          <h2>Featured Sighting</h2>
          <FeaturedPost
            postData={postData[0]}
            setPostDetails={modalOpenHandler}
          />
        </div>
      </section>

      <section className="Section-Two">
        <div className="container PostsGallery">
          {postData.map((post) => {
            return (
              <CardPost postData={post} setPostDetails={modalOpenHandler} />
            );
          })}
        </div>
      </section>

      {selectedPostDetails && (
        <Modal closeAction={() => setSelectedPostDetails(undefined)}>
          <CardPostModal postData={selectedPostDetails} />
        </Modal>
      )}
    </main>
  );
};

export default Posts;
