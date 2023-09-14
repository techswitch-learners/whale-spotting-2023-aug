import { useEffect, useState } from "react";
import { getAllBodiesOfWater } from "../../clients/backendApiClient";
import { BodyOfWater } from "../../models/BodyOfWater";
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";
import "./SearchBySea.scss";

export default function SearchBySea() {
  const [bodiesOfWater, setBodiesOfWater] = useState<BodyOfWater[]>();
  const [bodyOfWater, setBodyOfWater] = useState<string>();
  const navigate = useNavigate();

  const getBodiesOfWaterHandler = async () => {
    const response = await getAllBodiesOfWater();
    if (response) {
      const data = response.bodiesOfWater;
      setBodiesOfWater(data);
      setBodyOfWater(data[0].name);
    }

    console.log(response);
  };

  useEffect(() => {
    getBodiesOfWaterHandler();
  }, []);

  const searchHandler = () => {
    navigate(`/search-results/${bodyOfWater}`);
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
              {bodiesOfWater &&
                bodiesOfWater.map((bodyOfWater) => {
                  return (
                    <option
                      key={bodyOfWater.id}
                      className="SearchBySea__select__option"
                      value={bodyOfWater.name}
                    >
                      {bodyOfWater.name}
                    </option>
                  );
                })}
            </select>
          </label>

          <Button type="button" onClick={() => searchHandler()}>
            Search
          </Button>
        </div>
      </div>
    </section>
  );
}
