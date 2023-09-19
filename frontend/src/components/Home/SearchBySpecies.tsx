import { useEffect, useState } from "react";
import { getAllSpecies } from "../../clients/backendApiClient";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import "./SearchBySea.scss";
import SpeciesData from "../../models/SpeciesData";

const SearchBySea = () => {
  const [speciesList, setSpeciesList] = useState<SpeciesData[]>();
  const [species, setSpecies] = useState<string>();
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
      <div className="SearchBySea">
        <h3>Search For Posts by Sea/Ocean</h3>
        <div className="SearchBySea-row">
          <label htmlFor="species">
            <select
              className="SearchBySea__select"
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
                    className="SearchBySea__select__option"
                    value={species.name}
                    disabled={species.posts.posts.length === 0}
                  >
                    {species.name +
                      (species.posts.posts.length === 0
                        ? " (no posts yet)"
                        : "")}
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
