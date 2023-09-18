import { useEffect, useState } from "react";
import { getAllBodiesOfWater } from "../../clients/backendApiClient";
import BodyOfWaterData from "../../models/BodyOfWaterData";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import "./SearchBySea.scss";

const SearchBySea = () => {
  const [bodiesOfWater, setBodiesOfWater] = useState<BodyOfWaterData[]>();
  const [bodyOfWater, setBodyOfWater] = useState<string>();
  const navigate = useNavigate();

  useEffect(() => {
    getAllBodiesOfWater()
      .then((response) => setBodiesOfWater(response.bodiesOfWater))
      .catch();
  }, []);

  const searchHandler = () => {
    navigate(`/search?bodyOfWater=${bodyOfWater}`);
  };

  return (
    <section className="container">
      <div className="SearchBySea">
        <h3>Search For Posts by Sea/Ocean</h3>
        <div className="SearchBySea-row">
          <label htmlFor="bodyOfWater">
            <select
              className="SearchBySea__select"
              id="bodyOfWater"
              name="bodyOfWater"
              onChange={(e) => setBodyOfWater(e.target.value)}
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

          <Button type="button" onClick={() => searchHandler()}>
            Search
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SearchBySea;
