import { useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import WhaleLoader from "../components/UI/WhaleLoader";
import Button from "../components/UI/Button";
import {
  getAllBodiesOfWater,
  getBodyOfWaterByName,
} from "../clients/backendApiClient";
import SearchResultCard from "../components/Search/SearchResultCard";
import BodyOfWaterData from "../models/BodyOfWaterData";
import "./SearchResult.scss";

const SearchResult = () => {
  const [bodyOfWater, setBodyOfWater] = useState<BodyOfWaterData>();
  const [loading, setLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [otherError, setOtherError] = useState<boolean>(false);
  const [bodiesOfWater, setBodiesOfWater] = useState<BodyOfWaterData[]>();

  const searchParams = useSearchParams();
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
    <section className="container">
      <h2>Posts for {bodyOfWaterName}</h2>
      <div className="SearchResults">
        <div className="SearchResults__Filter">
          <div>Toggle Map/List</div>

          <h3>Searh from List</h3>

          <div className="SearchResults__Filter__List">
            <ul>
              {bodiesOfWater &&
                bodiesOfWater.map((bodyOfWater) => {
                  if (bodyOfWater.posts.length > 0) {
                    return (
                      <li
                        key={bodyOfWater.id}
                        className="SearchBySea__select__option"
                        value={bodyOfWater.name}
                        onClick={() => setBodyOfWaterName(bodyOfWater.name)}
                      >
                        {bodyOfWater.name +
                          (bodyOfWater.posts.length === 0
                            ? " (no posts yet)"
                            : "")}
                      </li>
                    );
                  }
                })}
            </ul>
          </div>
        </div>
        <main className="SearchResults__Main">
          {bodyOfWater && bodyOfWater.posts.length > 0 ? (
            bodyOfWater.posts.map((post) => {
              return <SearchResultCard key={post.id} post={post} />;
            })
          ) : (
            <h4>No posts, please try again... </h4>
          )}
        </main>
      </div>
    </section>
  );
};

export default SearchResult;
