import { useEffect, useState } from "react";
import { getAllBodiesOfWater } from "../../clients/backendApiClient";
import { BodyOfWater } from "../../models/BodyOfWater";
import "./SearchBySea.scss";

export default function SearchBySea() {
  const [bodiesOfWater, setBodiesOfWater] = useState<BodyOfWater[]>();
  const [bodyOfWater, setBodyOfWater] = useState<string>();

  const getBodiesOfWaterHandler = async () => {
    const response = await getAllBodiesOfWater();
    if (response) {
      const data = response.bodiesOfWater;
      setBodiesOfWater(data);
    }
    console.log(response);
  };

  useEffect(() => {
    getBodiesOfWaterHandler();
  }, []);

  return (
    <section className="container">
      <div className="SearchBySea">
        <h3>Search For Posts by Sea/Ocean</h3>
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
                    className="SearchBySea__select__option"
                    value={bodyOfWater.name}
                  >
                    {bodyOfWater.name}
                  </option>
                );
              })}
          </select>
        </label>
        <p>You've choose {bodyOfWater}!</p>
      </div>
    </section>
  );
}
