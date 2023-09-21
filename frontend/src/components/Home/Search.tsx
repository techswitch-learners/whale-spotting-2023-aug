import { useEffect, useState } from "react";
import {
  getAllBodiesOfWater,
  getAllSpecies,
} from "../../clients/backendApiClient";
import BodyOfWaterData from "../../models/BodyOfWaterData";
import SpeciesData from "../../models/SpeciesData";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import "./Search.scss";

const Search = () => {
  const [bodiesOfWater, setBodiesOfWater] = useState<BodyOfWaterData[]>();
  const [bodyOfWater, setBodyOfWater] = useState<string>();
  const [speciesList, setSpeciesList] = useState<SpeciesData[]>();
  const [species, setSpecies] = useState<string>();
  const navigate = useNavigate();

  useEffect(() => {
    getAllBodiesOfWater()
      .then((response) => setBodiesOfWater(response.bodiesOfWater))
      .catch();
    getAllSpecies()
      .then((response) => setSpeciesList(response.speciesList))
      .catch();
  }, []);

  const searchHandler = () => {
    const url = `/posts`;
    const urlSearchParams = new URLSearchParams();
    if (bodyOfWater) {
      urlSearchParams.append("bodyOfWater", bodyOfWater);
    }
    if (species) {
      urlSearchParams.append("species", species);
    }
    navigate(`${url}?${urlSearchParams.toString()}`);
  };

  return (
    <section className="container">
      <div className="SearchBy">
        <h3>Search For Posts</h3>
        <div className="SearchBy-row">
          <label htmlFor="bodyOfWater">
            By Sea/Ocean:
            <select
              className="SearchBy__select"
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
                    className="SearchBy__select__option"
                    value={bodyOfWater.name}
                    disabled={bodyOfWater.posts.length === 0}
                  >
                    {bodyOfWater.name +
                      (bodyOfWater.posts.length === 0 ? " (no posts yet)" : "")}
                  </option>
                ))}
            </select>
          </label>
          <label htmlFor="species">
            By Species:
            <select
              className="SearchBy__select"
              id="species"
              name="species"
              onChange={(e) => setSpecies(e.target.value)}
            >
              <option selected disabled>
                Please select...
              </option>
              {speciesList &&
                speciesList.map((species) => (
                  <option
                    key={species.id}
                    className="SearchBy__select__option"
                    value={species.name}
                    disabled={species.posts.length === 0}
                  >
                    {species.name +
                      (species.posts.length === 0 ? " (no posts yet)" : "")}
                  </option>
                ))}
            </select>
          </label>
        </div>
        <Button type="button" onClick={() => searchHandler()}>
          Search
        </Button>
      </div>
    </section>
  );
};

export default Search;
