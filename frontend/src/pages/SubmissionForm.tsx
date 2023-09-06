import w3w_logo from "../assets/w3w_logo.png";
import { getLatitudeLongitude } from "../clients/backendApiClient";
import "./SubmissionForm.scss";
import { useEffect, useState } from "react";
import { FormEvent } from "react";

const SubmissionForm = () => {
  //function for today's date
  const today = new Date();
  const todayDateString = today.toISOString().slice(0, -1);

  // useStates for form
  const [date, setDate] = useState<Date>(new Date());
  const [w3w, setW3w] = useState<string>("");
  const [lat, setLat] = useState<number>(NaN);
  const [lon, setLon] = useState<number>(NaN);
  const [species, setSpecies] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [locationErrorMessage, setLocationErrorMessage] = useState<string>("");
  const [speciesErrorMessage, setSpeciesErrorMessage] = useState<string>("");

  const validW3wPattern = /^\/\/\/[a-zA-Z]+\.[a-zA-Z]+\.[a-zA-Z]+$/g;

  useEffect(() => {
    const words = w3w?.slice(3);
    getLatitudeLongitude(words)
      .then((data) => {
        setLat(data.lat);
        setLon(data.lng);
      })
      .catch(() => setLocationErrorMessage("Please enter a valid what3words"));
  }, [w3w]);

  // submit function
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!w3w && !lat && !lon) {
      setLocationErrorMessage(
        "Please provide either what3words or a latitude and longitude ",
      );
      return;
    }
    if ((!lat && lon) || (!lon && lat)) {
      setLocationErrorMessage("Please fill both latitude and longitude");
      return;
    }

    if (species == undefined) {
      setSpeciesErrorMessage("Please select a species");
    }

    if (w3w && !validW3wPattern.test(w3w)) {
      setLocationErrorMessage("Please enter a valid what3words");
    } else if (w3w && validW3wPattern.test(w3w)) {
      const words = w3w?.slice(3);
      console.log(words);
      getLatitudeLongitude(words)
        .then((data) => {
          setLat(data.lat);
          setLon(data.lng);
          console.log(data.lat, data.lng);
        })
        .catch(() =>
          setLocationErrorMessage("Please enter a valid what3words"),
        );

      const data = {
        w3w,
        lat,
        lon,
      };
      console.log(data);
    }
    if (lat && lon) {
      fetch(`https://localhost:7082/Post/`);
    }
  };
  useEffect(() => {
    setLocationErrorMessage("");
  }, [w3w, lat, lon]);

  useEffect(() => {
    setSpeciesErrorMessage("");
  }, [species]);

  return (
    <>
      <div className="submission-form-container">
        <form className="submission-form" onSubmit={handleSubmit}>
          <h1>Submit a sighting</h1>
          <label htmlFor="date" className="submission-form-children">
            Date of sighting
          </label>
          <input
            type="datetime-local"
            required
            id="date"
            name="date"
            value={date.toISOString().slice(0, 16)}
            max={todayDateString}
            onChange={(event) => setDate(new Date(event.target.value))}
          />

          <div className="location-container submission-form-children">
            <p>
              <label htmlFor="location">Location</label>
              <a
                href="https://what3words.com/pretty.needed.chill"
                target="popup"
              >
                <img
                  src={w3w_logo}
                  className="w3w-logo"
                  alt="what 3 words logo, click here to open the page"
                />
                (click to open what3words)
              </a>
            </p>
            <span className="location-error-message">
              {locationErrorMessage}
            </span>
          </div>
          <input
            type="text"
            id="w3w"
            name="w3w"
            placeholder="Enter your what3words"
            value={w3w}
            onChange={(event) => {
              setW3w(event.target.value);
            }}
          />
          <span>or</span>
          <div className="latlon-container">
            <input
              type="number"
              id="lat"
              name="lat"
              placeholder="Latitude"
              value={isNaN(lat) ? "" : lat}
              onChange={(event) => setLat(parseFloat(event.target.value))}
            />
            <input
              type="number"
              id="lon"
              name="lon"
              placeholder="Longitude"
              value={isNaN(lon) ? "" : lon}
              onChange={(event) => setLon(parseFloat(event.target.value))}
            />
          </div>

          <label htmlFor="species" className="submission-form-children">
            Species
          </label>
          <span className="species-error-message">{speciesErrorMessage}</span>
          <select
            name="species"
            id="species"
            required
            onChange={(event) => setSpecies(event.target.value)}
          >
            <option value="Options">Please select a species</option>
            <option value="1">Blue Whale</option>
            <option value="2">Bowhead Whale</option>
            <option value="3">Bryde's Whale</option>
            <option value="4">False Killer Whale</option>
            <option value="5">Fin whale</option>
            <option value="6">Gray Whale</option>
            <option value="7">Hump Back Whale</option>
            <option value="8">Killer whale</option>
            <option value="9">Minke Whale</option>
            <option value="10">Pilot Whale</option>
            <option value="11">Right whale</option>
            <option value="12">Sei Whale</option>
            <option value="13">Sperm Whale</option>
          </select>

          <label htmlFor="date" className="submission-form-children">
            Description
          </label>
          <textarea
            id="description"
            required
            rows={4}
            cols={50}
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          >
            {""}
          </textarea>

          <label htmlFor="date" className="submission-form-children">
            Upload your image
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            className="image-url-link"
            required
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
          />

          <input type="submit" className="submission-form-children" />
        </form>
      </div>
    </>
  );
};

export default SubmissionForm;
