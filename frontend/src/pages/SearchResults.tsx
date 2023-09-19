import { useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import {
  getAllBodiesOfWater,
  getBodyOfWaterByName,
} from "../clients/backendApiClient";
import WhaleLoader from "../components/UI/WhaleLoader";
import Button from "../components/UI/Button";
import BodyOfWaterData from "../models/BodyOfWaterData";
import CardPost from "../components/Post/CardPost";
import Modal from "../components/UI/Modal";
import CardPostModal from "../components/Post/CardPostModal";
import PostData from "../models/PostData";

const SearchResults = () => {
  const [selectedPostDetails, setSelectedPostDetails] = useState<PostData>();
  const [bodyOfWater, setBodyOfWater] = useState<BodyOfWaterData>();
  const [loading, setLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [otherError, setOtherError] = useState<boolean>(false);
  const [bodiesOfWater, setBodiesOfWater] = useState<BodyOfWaterData[]>();
  const [searchParams] = useSearchParams();
  const [bodyOfWaterName, setBodyOfWaterName] = useState(
    searchParams.get("bodyOfWater"),
  );

  const fetchSearchResults = useCallback(async () => {
    setNotFound(false);
    setOtherError(false);
    setBodyOfWater(undefined);

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

  useEffect(() => {
    getAllBodiesOfWater()
      .then((response) => setBodiesOfWater(response.bodiesOfWater))
      .catch();
  }, []);

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
    <>
      <section className="container">
        <div className="SearchResults__Filter">
          <label htmlFor="bodyOfWater">
            <select
              className="SearchBySea__select"
              id="bodyOfWater"
              name="bodyOfWater"
              onChange={(e) => setBodyOfWaterName(e.target.value)}
            >
              <option selected disabled>
                Please select...
              </option>
              {bodiesOfWater &&
                bodiesOfWater.map((bodyOfWater) => (
                  <option
                    key={bodyOfWater.id}
                    className="SearchBySea__select__option"
                    value={bodyOfWater.name}
                    disabled={bodyOfWater.posts.length === 0}
                  >
                    {bodyOfWater.name +
                      (bodyOfWater.posts.length === 0 ? " (no posts yet)" : "")}
                  </option>
                ))}
            </select>
          </label>
        </div>
        <h2>Posts for {bodyOfWaterName}</h2>
        <div className="SearchResults">
          <div className="container PostsGallery">
            {bodyOfWater &&
              bodyOfWater.posts.map((post) => {
                return (
                  <CardPost
                    postData={post}
                    openModalAction={() => setSelectedPostDetails(post)}
                  />
                );
              })}
          </div>
          {selectedPostDetails && (
            <Modal closeAction={() => setSelectedPostDetails(undefined)}>
              <CardPostModal postData={selectedPostDetails} />
            </Modal>
          )}
        </div>
      </section>
    </>
  );
};

export default SearchResults;
