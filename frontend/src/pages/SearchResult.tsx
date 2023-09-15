import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import WhaleLoader from "../components/UI/WhaleLoader";
import Button from "../components/UI/Button";
import { BodyOfWater } from "../models/BodyOfWater";
import { getBodyOfWaterByName } from "../clients/backendApiClient";
import PostData from "../models/PostData";
import SearchResultCard from "../components/Search/SearchResultCard";
import "./SearchResult.scss";
import Modal from "../components/UI/Modal";
import SearchPostModal from "../components/Search/SearchPostModal";

const SearchResult = () => {
  const [selectedPostDetails, setSelectedPostDetails] = useState<PostData>();
  const [bodyOfWater, setBodyOfWater] = useState<BodyOfWater>();
  const [loading, setLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [otherError, setOtherError] = useState<boolean>(false);

  const { bodyOfWaterName } = useParams<{ bodyOfWaterName: string }>();

  const fetchSearchResults = useCallback(async () => {
    setNotFound(false);
    setOtherError(false);
    // setBodyOfWater(undefined);

    if (bodyOfWaterName) {
      setLoading(true);
      await getBodyOfWaterByName(bodyOfWaterName)
        .then((response) => {
          if (response.ok) {
            response.json().then(setBodyOfWater);
          } else {
            setNotFound(true);
          }
        })
        .catch(() => {
          setOtherError(true);
        });
      setLoading(false);
    } else {
      setNotFound(true);
      setLoading(false);
    }
  }, [bodyOfWaterName]);

  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults]);

  console.log(selectedPostDetails);

  if (loading || notFound || otherError) {
    return (
      <main>
        <section className="section-dark">
          <div className="container Posts__loader">
            <WhaleLoader
              isLoading={loading}
              message={
                loading
                  ? "Loading..."
                  : notFound
                  ? "That body of water doesn't seem to exist."
                  : "Couldn't fetch posts at this time."
              }
            />
            {otherError && (
              <Button onClick={fetchSearchResults}>Try Again</Button>
            )}
          </div>
        </section>
      </main>
    );
  }

  return (
    <section className="container">
      <h2>Posts for {bodyOfWaterName}</h2>
      <div className="SearchResults">
        <div className="SearchResults__Filter">
          <div>Toggle Map/List</div>
        </div>
        <main className="SearchResults__Main">
          {bodyOfWater && bodyOfWater.posts.length > 0 ? (
            bodyOfWater.posts.map((post) => {
              return (
                <SearchResultCard
                  key={post.id}
                  post={post}
                  openModalAction={() => setSelectedPostDetails(post)}
                />
              );
            })
          ) : (
            <h4>No posts, please try again... </h4>
          )}

          {selectedPostDetails && (
            <Modal closeAction={() => setSelectedPostDetails(undefined)}>
              <SearchPostModal postData={selectedPostDetails} />
            </Modal>
          )}
        </main>
      </div>
    </section>
  );
};

export default SearchResult;
