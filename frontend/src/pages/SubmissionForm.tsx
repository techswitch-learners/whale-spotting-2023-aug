import { useEffect, useState, FormEvent } from "react";
import w3w_logo from "../assets/w3w_logo.png";
import {
  createWhalePost,
  getLatitudeLongitude,
  getAllSpecies,
} from "../clients/backendApiClient";
import Button from "../components/UI/Button";
import SpeciesListData from "../models/SpeciesListData";
import "./SubmissionForm.scss";

const SubmissionForm = () => {
  const today = new Date();
  const todayDateString = today.toISOString().slice(0, -1);

  const [date, setDate] = useState<Date>(new Date());
  const [w3w, setW3w] = useState<string>("");
  const [lat, setLat] = useState<number>(NaN);
  const [lon, setLon] = useState<number>(NaN);
  const [species, setSpecies] = useState<number>(NaN);
  const [description, setDescription] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [locationErrorMessage, setLocationErrorMessage] = useState<string>("");
  const [speciesErrorMessage, setSpeciesErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [speciesListData, setSpeciesListData] = useState<SpeciesListData>();

  const validW3wPattern = /^(\/\/\/)?[a-zA-Z]+\.[a-zA-Z]+\.[a-zA-Z]+$/g;

  useEffect(() => {
    let words;
    if (w3w.startsWith("///")) {
      words = w3w.slice(3);
    } else {
      words = w3w;
    }
    getLatitudeLongitude(words)
      .then((data) => {
        setLat(data.lat);
        setLon(data.lng);
      })
      .catch(() => setLocationErrorMessage("Please enter a valid what3words"));
  }, [w3w]);

  useEffect(() => {
    getAllSpecies().then(setSpeciesListData);
  }, []);

  const openW3W = () =>
    window.open("https://what3words.com/pretty.needed.chill", "_blank");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!w3w && !lat && !lon) {
      setLocationErrorMessage(
        "Please provide either what3words or a latitude and longitude",
      );
      return;
    }

    if ((!lat && lon) || (!lon && lat)) {
      setLocationErrorMessage("Please fill both latitude and longitude");
      return;
    }

    if (isNaN(species)) {
      setSpeciesErrorMessage("Please select a species");
      return;
    }

    if (w3w && !validW3wPattern.test(w3w)) {
      setLocationErrorMessage("Please enter a valid what3words");
    } else if (w3w && validW3wPattern.test(w3w)) {
      let words;
      if (w3w.startsWith("///")) {
        words = w3w.slice(3);
      } else {
        words = w3w;
      }
      getLatitudeLongitude(words)
        .then((data) => {
          setLat(data.lat);
          setLon(data.lng);
        })
        .catch(() =>
          setLocationErrorMessage("Please enter a valid what3words"),
        );
    }
    if (lat && lon) {
      createWhalePost(date, lat, lon, species, description, imageUrl)
        .then(() => {
          setSuccessMessage("Thank you for your submission");
        })
        .catch(() => {
          setSuccessMessage("Please check the information provided");
        });
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
      <div className="container">
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
            <label htmlFor="location">Location</label>
            <span className=" error-message location-error-message">
              {locationErrorMessage}
            </span>
          </div>
          <div className="w3w-container">
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
            <Button type="button" onClick={openW3W}>
              <img
                src={w3w_logo}
                className="w3w-logo"
                alt="what 3 words logo, click here to open the page"
              />
            </Button>
          </div>
          <p>or</p>
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
          <span className="error-message  species-error-message">
            {speciesErrorMessage}
          </span>
          <select
            name="species"
            id="species"
            required
            onChange={(event) => setSpecies(parseInt(event.target.value))}
          >
            <option>
              {speciesListData ? "Choose species" : "Choose species (loading)"}
            </option>
            {speciesListData?.speciesList
              .sort((a, b) => a.id - b.id)
              .map((species) => (
                <option value={species.id}>{species.name}</option>
              ))}
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

          <Button type="submit" className="submission-form-children">
            Submit
          </Button>
          <span className="error-message">{successMessage}</span>
        </form>
      </div>
    </>
  );
};

export default SubmissionForm;
