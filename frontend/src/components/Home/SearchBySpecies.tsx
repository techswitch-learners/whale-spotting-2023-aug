import { useEffect, useState } from "react";
import { getAllSpecies } from "../../clients/backendApiClient";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import SpeciesData from "../../models/SpeciesData";
import "./SearchBySpecies.scss";

const SearchBySpecies = () => {
  const [speciesList, setSpeciesList] = useState<SpeciesData[]>();
  const [species, setSpecies] = useState<number>();
  const navigate = useNavigate();

  useEffect(() => {
    getAllSpecies()
      .then((response) => setSpeciesList(response.speciesList))
      .catch();
  }, []);

  const searchHandler = () => {
    navigate(`/search?species=${species}`);
  };

  return (
    <section className="container">
      <div className="SearchBySpecies">
        <h3>Search For Posts by Species</h3>
        <div className="SearchBySpecies-row">
          <label htmlFor="species">
            <select
              className="SearchBySpecies__select"
              id="species"
              name="species"
              onChange={(e) => setSpecies(parseInt(e.target.value))}
            >
              <option selected disabled>
                Please select...
              </option>
              {speciesList &&
                speciesList.map((species) => (
                  <option
                    key={species.id}
                    className="SearchBySpecies__select__option"
                    value={species.id}
                    disabled={species.posts.length === 0}
                  >
                    {species.name +
                      (species.posts.length === 0 ? " (no posts yet)" : "")}
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

export default SearchBySpecies;
