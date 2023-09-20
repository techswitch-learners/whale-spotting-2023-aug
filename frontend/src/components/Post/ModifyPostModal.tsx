import { useState, useEffect, FormEvent, useContext } from "react";
import PostData from "../../models/PostData";
import Button from "../UI/Button";
import SpeciesListData from "../../models/SpeciesListData";
import w3w_logo from "../../assets/w3w_logo.png";
import {
  getLatitudeLongitude,
  getAllSpecies,
  modifyPost,
  approveOrRejectPost,
} from "../../clients/backendApiClient";
import ApprovalStatus from "../../enums/ApprovalStatus";
import { LoginContext } from "../../context/LoginManager";
import "./ModifyPostModal.scss";

const validW3wPattern = /^(\/\/\/)?[a-zA-Z]+\.[a-zA-Z]+\.[a-zA-Z]+$/g;

interface PostDataProps {
  postData: PostData;
  completeEdit: () => void;
}

const ModifyPostModal = ({ postData, completeEdit }: PostDataProps) => {
  const today = new Date();
  const todayDateString = today.toISOString().slice(0, -1);

  const id = postData.id;
  const [date, setDate] = useState<Date>(new Date(postData.creationTimestamp));
  const [w3w, setW3w] = useState<string>("");
  const [lat, setLat] = useState<number>(postData.latitude);
  const [lon, setLon] = useState<number>(postData.longitude);
  const [speciesId, setSpeciesId] = useState<number>(postData.species.id);
  const [description, setDescription] = useState<string>(postData.description);
  const [imageUrl, setImageUrl] = useState<string>(postData.imageUrl);
  const [locationErrorMessage, setLocationErrorMessage] = useState<string>("");
  const [speciesErrorMessage, setSpeciesErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [speciesListData, setSpeciesListData] = useState<SpeciesListData>();
  const [toApprove, setToApprove] = useState<boolean>(false);
  const loginContext = useContext(LoginContext);

  useEffect(() => {
    getAllSpecies().then(setSpeciesListData);
  }, []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!w3w && isNaN(lat) && isNaN(lon)) {
      setLocationErrorMessage(
        "Please provide either what3words or a latitude and longitude",
      );
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

    if (w3w && !validW3wPattern.test(w3w)) {
      setLocationErrorMessage("Please enter a valid what3words");
      return;
    } else if (w3w) {
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
    } else if (isNaN(lat) && isNaN(lon)) {
      setLocationErrorMessage("Please enter a valid location or what3words");
      return;
    }

    modifyPost(
      id,
      date,
      lat,
      lon,
      speciesId,
      description,
      imageUrl,
      loginContext.encodedAuth,
    ).then(async () => {
      if (toApprove) {
        try {
          const success = await approveOrRejectPost(
            id,
            ApprovalStatus.Approved,
            loginContext.encodedAuth,
          );
          if (success) {
            setSuccessMessage("Post update and approval successful");
            completeEdit();
          } else {
            setSuccessMessage("Unsuccessful");
          }
        } catch (error) {
          setSuccessMessage("Unable to approve post, please try again");
        }
      } else {
        setSuccessMessage("Post successfully updated");
        completeEdit();
      }
    });
  };

  useEffect(() => {
    if (!isNaN(lat) && !isNaN(lon)) {
      setLocationErrorMessage("");
    }
  }, [lat, lon]);

  useEffect(() => {
    setSpeciesErrorMessage("");
  }, [speciesId]);

  return (
    <>
      <div className="modify-form-container">
        <form className="submission-form" onSubmit={handleSubmit}>
          <h1 className="modify-title">Update Sighting Information</h1>
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
            <span className=" error-message location-error-message">
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
              min={-90}
              max={90}
              step="any"
              id="lat"
              name="lat"
              placeholder="Latitude"
              value={lat}
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
              value={lon}
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
            onChange={(event) => setSpeciesId(parseInt(event.target.value))}
            value={postData.species.id}
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

          <label htmlFor="description" className="submission-form-children">
            Description
          </label>
          <textarea
            className="post-description"
            id="description"
            required
            rows={8}
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

          <div className="button-container">
            <Button type="submit" className="submit-button">
              Submit
            </Button>
            <Button
              type="submit"
              className="submit-button"
              onClick={() => setToApprove(true)}
            >
              Submit and Approve
            </Button>
          </div>
          <span className="error-message">{successMessage}</span>
        </form>
      </div>
    </>
  );
};

export default ModifyPostModal;
