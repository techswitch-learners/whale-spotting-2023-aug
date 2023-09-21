import { useEffect, useState, FormEvent, useContext } from "react";
import w3w_logo from "../assets/w3w_logo.png";
import {
  createWhalePost,
  getLatitudeLongitude,
  getAllSpecies,
} from "../clients/backendApiClient";
import Button from "../components/UI/Button";
import SpeciesListData from "../models/SpeciesListData";
import { LoginContext } from "../context/LoginManager";
import { useNavigate } from "react-router-dom";
import "./PostForm.scss";

const validW3wPattern = /^(\/\/\/)?[a-zA-Z]+\.[a-zA-Z]+\.[a-zA-Z]+$/g;

const PostForm = () => {
  const today = new Date();
  const todayDateString = today.toISOString().slice(0, -1);

  const [date, setDate] = useState<Date>(new Date());
  const [w3w, setW3w] = useState<string>("");
  const [lat, setLat] = useState<number>(NaN);
  const [lon, setLon] = useState<number>(NaN);
  const [speciesId, setSpeciesId] = useState<number>(NaN);
  const [description, setDescription] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [locationErrorMessage, setLocationErrorMessage] = useState<string>("");
  const [speciesErrorMessage, setSpeciesErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [speciesListData, setSpeciesListData] = useState<SpeciesListData>();
  const loginContext = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loginContext.isLoggedIn) {
      navigate("/login");
    }
    getAllSpecies().then(setSpeciesListData);
  }, [loginContext.isLoggedIn, navigate]);

  const populateLatLon = () => {
    if (!w3w || !validW3wPattern.test(w3w)) {
      setLocationErrorMessage("Please enter a valid what3words");
      return;
    } else {
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
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setLocationErrorMessage("");
    setSuccessMessage("");
    setSpeciesErrorMessage("");

    if (isNaN(lat) && isNaN(lon)) {
      setLocationErrorMessage("Please provide a latitude and longitude");
      return;
    }

    if ((isNaN(lat) && !isNaN(lon)) || (isNaN(lon) && !isNaN(lat))) {
      setLocationErrorMessage("Please fill both latitude and longitude");
      return;
    }

    if (isNaN(speciesId)) {
      setSpeciesErrorMessage("Please select a species");
      return;
    }

    createWhalePost(
      date,
      lat,
      lon,
      speciesId,
      description,
      imageUrl,
      loginContext.encodedAuth,
    )
      .then(() => {
        setSuccessMessage("Thank you for your submission. Awaiting approval.");
      })
      .catch(() => {
        setSuccessMessage("Please check the information provided");
      });
  };

  useEffect(() => {
    if (w3w || (!isNaN(lat) && !isNaN(lon))) {
      setLocationErrorMessage("");
    }
  }, [w3w, lat, lon]);

  useEffect(() => {
    setSpeciesErrorMessage("");
  }, [speciesId]);

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

          <div className="latlon-container">
            <input
              type="number"
              min={-90}
              max={90}
              step="any"
              id="lat"
              name="lat"
              placeholder="Latitude"
              value={isNaN(lat) ? "" : lat}
              onChange={(event) => setLat(parseFloat(event.target.value))}
            />
            <input
              type="number"
              min={-180}
              max={180}
              step="any"
              id="lon"
              name="lon"
              placeholder="Longitude"
              value={isNaN(lon) ? "" : lon}
              onChange={(event) => setLon(parseFloat(event.target.value))}
            />
          </div>
          <label htmlFor="w3w" className="submission-form-children">
            (Optional) Get values from{" "}
            <a
              className="w3w__link"
              href="https://what3words.com/pretty.needed.chill"
              target="_blank"
            >
              <img src={w3w_logo} alt="What3Words" />
            </a>
          </label>
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
            <Button type="button" role="link" onClick={populateLatLon}>
              <small>Get&nbsp;values</small>
            </Button>
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
            onChange={(event) => setSpeciesId(parseInt(event.target.value))}
          >
            <option selected disabled>
              {speciesListData ? "Choose species" : "Choose species (loading)"}
            </option>
            {speciesListData?.speciesList
              .sort((a, b) => a.id - b.id)
              .map((species) => (
                <option value={species.id}>{species.name}</option>
              ))}
          </select>

          <label htmlFor="description" className="submission-form-children">
            Description
          </label>
          <textarea
            id="description"
            required
            rows={4}
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />

          <label htmlFor="imageUrl" className="submission-form-children">
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

export default PostForm;
