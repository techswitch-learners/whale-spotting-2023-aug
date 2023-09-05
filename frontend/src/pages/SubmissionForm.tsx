import w3w_logo from "../assets/w3w_logo.png";
import "./SubmissionForm.scss";
import { useEffect, useState } from "react";
import { FormEvent } from "react";

const SubmissionForm = () => {
  //function for today's date
  function padTo2Digits(num: number) {
    return num.toString().padStart(2, "0");
  }
  function dateToString(date: Date) {
    const date_String =
      date.getFullYear() +
      "-" +
      padTo2Digits(date.getMonth() + 1) +
      "-" +
      padTo2Digits(date.getDate());
    return date_String;
  }
  const today = new Date();
  const todayDateString = dateToString(today);

  // useStates for form
  const [date, setDate] = useState<string>();
  const [w3w, setW3w] = useState<string>();
  const [lat, setLat] = useState<string>();
  const [lon, setLon] = useState<string>();
  const [species, setSpecies] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [imageUrl, setImageUrl] = useState<string>();
  const [locationErrorMessage, setLocationErrorMessage] = useState<string>("");
  const [speciesErrorMessage, setSpeciesErrorMessage] = useState<string>("");

  const validW3wPattern = /^\/\/\/[a-zA-Z]+\.[a-zA-Z]+\.[a-zA-Z]+$/g;
  // const w3wArray = validW3wPattern.exec(w3w:string);

  console.log(
    date,
    species,
    description,
    imageUrl,
    locationErrorMessage,
    speciesErrorMessage,
  );
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

      const data = {
        date,
        w3w,
        lat,
        lon,
        species,
        description,
        imageUrl,
        locationErrorMessage,
        speciesErrorMessage,
      };
      console.log(data);
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
            type="date"
            required
            id="date"
            name="date"
            max={todayDateString}
            onChange={(event) => setDate(event.currentTarget.value)}
          />

          <div className="location-container submission-form-children">
            <p>
              {/* <span className='location-error-message' style={errorMessage}>Please enter location details</span> */}
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
            onChange={(event) => setW3w(event.currentTarget.value)}
          />
          <span>or</span>
          <div className="latlon-container">
            <input
              type="text"
              id="lat"
              name="lat"
              placeholder="Latitude"
              value={lat}
              onChange={(event) => setLat(event.currentTarget.value)}
            />
            <input
              type="text"
              id="lon"
              name="lon"
              placeholder="Longitude"
              value={lon}
              onChange={(event) => setLon(event.currentTarget.value)}
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
            onChange={(event) => setSpecies(event.currentTarget.value)}
          >
            <option value="Options">Please select a species</option>
            <option value="Blue Whale">Blue Whale</option>
            <option value="Bowhead Whale">Bowhead Whale</option>
            <option value="Bryde's Whale">Bryde's Whale</option>
            <option value="False Killer Whale">False Killer Whale</option>
            <option value="Fin whale">Fin whale</option>
            <option value="Gray Whale">Gray Whale</option>
            <option value="Hump Back Whale">Hump Back Whale</option>
            <option value="Killer whale">Killer whale</option>
            <option value="Minke Whale">Minke Whale</option>
            <option value="Pilot Whale">Pilot Whale</option>
            <option value="Right whale">Right whale</option>
            <option value="Sei Whale">Sei Whale</option>
            <option value="Sperm Whale">Sperm Whale</option>
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
            onChange={(event) => setDescription(event.currentTarget.value)}
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
            onChange={(event) => setImageUrl(event.currentTarget.value)}
          />

          <input type="submit" className="submission-form-children" />
        </form>
      </div>
    </>
  );
};

export default SubmissionForm;
