import { useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState, useContext } from "react";
import {
  getAllBodiesOfWater,
  getAllSpecies,
  searchPosts,
  interactWithPost,
} from "../clients/backendApiClient";
import { LoginContext } from "../context/LoginManager";
import WhaleLoader from "../components/UI/WhaleLoader";
import Button from "../components/UI/Button";
import BodyOfWaterData from "../models/BodyOfWaterData";
import CardPost from "../components/Post/CardPost";
import Modal from "../components/UI/Modal";
import CardPostModal from "../components/Post/CardPostModal";
import PostData from "../models/PostData";
import SpeciesData from "../models/SpeciesData";
import CreatePostButton from "../components/UI/CreatePostButton";
import "./Posts.scss";

const Posts = () => {
  const [selectedPostDetails, setSelectedPostDetails] = useState<PostData>();
  const [searchResults, setSearchResults] = useState<PostData[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [speciesList, setSpeciesList] = useState<SpeciesData[]>();
  const [bodiesOfWater, setBodiesOfWater] = useState<BodyOfWaterData[]>();
  const [searchParams] = useSearchParams();
  const [bodyOfWaterName, setBodyOfWaterName] = useState(
    searchParams.get("bodyOfWater"),
  );
  const [speciesName, setSpeciesName] = useState(searchParams.get("species"));
  const loginContext = useContext(LoginContext);

  const handleLike = async (postId: number) => {
    if (loginContext.isLoggedIn) {
      const interactionResult = await interactWithPost(
        postId,
        loginContext.encodedAuth,
      );
      if (interactionResult) {
        const updatedPosts = searchResults?.map((post) => {
          return post.id == postId
            ? {
                ...post,
                hasInteractionFromCurrentUser: true,
                interactionCount: post.interactionCount + 1,
              }
            : post;
        });
        setSearchResults(updatedPosts);

        if (selectedPostDetails) {
          const selectedPostData = updatedPosts?.find(
            (post) => post.id === selectedPostDetails.id,
          );
          setSelectedPostDetails(selectedPostData);
        }
      }
    }
  };

  const fetchSearchResults = useCallback(async () => {
    setError(false);
    setSearchResults(undefined);

    await searchPosts(
      bodyOfWaterName ?? undefined,
      speciesName ?? undefined,
      loginContext.encodedAuth,
    )
      .then((data) => {
        setSearchResults(data.posts);
      })
      .catch(() => {
        setError(true);
      });
    setLoading(false);
  }, [bodyOfWaterName, speciesName, loginContext.encodedAuth]);

  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults]);

  useEffect(() => {
    getAllBodiesOfWater()
      .then((response) => setBodiesOfWater(response.bodiesOfWater))
      .catch();
    getAllSpecies()
      .then((response) => setSpeciesList(response.speciesList))
      .catch();
  }, []);

  if (loading || error) {
    return (
      <main>
        <h1>Search for Posts</h1>
        <section className="section-dark">
          <div className="container Posts__loader">
            <WhaleLoader
              isLoading={loading}
              message={
                loading ? "Loading..." : "Couldn't fetch posts at this time."
              }
            />
            {error && <Button onClick={fetchSearchResults}>Try Again</Button>}
          </div>
        </section>
      </main>
    );
  }

  return (
    <>
      <h1>Search for Posts</h1>
      <section className="container">
        <div className="Search">
          <div className="Search__row">
            <label htmlFor="bodyOfWater">
              By Sea/Ocean:
              <select
                className="Search__select"
                id="bodyOfWater"
                name="bodyOfWater"
                value={bodyOfWaterName ?? undefined}
                onChange={(e) => setBodyOfWaterName(e.target.value)}
              >
                <option value="">Please select...</option>
                {bodiesOfWater &&
                  bodiesOfWater.map((bodyOfWater) => (
                    <option
                      key={bodyOfWater.id}
                      className="Search__select__option"
                      value={bodyOfWater.name}
                      disabled={!bodyOfWater.hasPosts}
                    >
                      {bodyOfWater.name +
                        (bodyOfWater.hasPosts ? "" : " (no posts yet)")}
                    </option>
                  ))}
              </select>
            </label>
            <label htmlFor="species">
              By Species:
              <select
                className="Search__select"
                id="species"
                name="species"
                value={speciesName ?? undefined}
                onChange={(e) => setSpeciesName(e.target.value)}
              >
                <option value="">Please select...</option>
                {speciesList &&
                  speciesList.map((species) => (
                    <option
                      key={species.id}
                      className="Search__select__option"
                      value={species.name}
                      disabled={!species.hasPosts}
                    >
                      {species.name +
                        (species.hasPosts ? "" : " (no posts yet)")}
                    </option>
                  ))}
              </select>
            </label>
          </div>
        </div>
        {searchResults && searchResults.length > 0 ? (
          <div className="SearchResults">
            <h2 className="SearchResults__Header">{`Posts${
              speciesName ? " for " + speciesName : ""
            }${bodyOfWaterName ? " in " + bodyOfWaterName : ""}`}</h2>
            <div className="container PostsGallery">
              {searchResults &&
                searchResults.map((post) => {
                  return (
                    <CardPost
                      postData={post}
                      openModalAction={() => setSelectedPostDetails(post)}
                      likePost={handleLike}
                    />
                  );
                })}
            </div>
            {selectedPostDetails && (
              <Modal closeAction={() => setSelectedPostDetails(undefined)}>
                <CardPostModal
                  postData={selectedPostDetails}
                  likePost={handleLike}
                />
              </Modal>
            )}
          </div>
        ) : (
          <div className="SearchResults">
            <h2 className="SearchResults__Header">
              {searchResults ? "No posts found" : "Loading..."}
            </h2>
          </div>
        )}
        <CreatePostButton />
      </section>
    </>
  );
};

export default Posts;
