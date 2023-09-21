import { useState, FormEvent, useContext, useEffect } from "react";
import { createEvent } from "../clients/backendApiClient";
import { LoginContext } from "../context/LoginManager";
import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import "./EventForm.scss";

const EventForm = () => {
  const today = new Date();
  const todayDateString = today.toISOString().slice(0, -4);

  const [name, setName] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [duration, setDuration] = useState<number>(NaN);
  const [location, setLocation] = useState<string>("");
  const [link, setlink] = useState<string>("");
  const [imageUrl, setimageUrl] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const loginContext = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loginContext.isLoggedIn) {
      navigate("/login");
    } else {
      if (!loginContext.isAdmin) {
        navigate("/forbidden");
      }
    }
  }, [loginContext.isLoggedIn, loginContext.isAdmin, navigate]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    createEvent(
      name,
      startDate,
      duration,
      location,
      link,
      imageUrl,
      loginContext.encodedAuth,
    )
      .then((success) => {
        if (success) {
          setMessage("Thank you for your submission");
          setName("");
          setStartDate(new Date());
          setDuration(NaN);
          setLocation("");
          setlink("");
          setimageUrl("");
        } else {
          setMessage("Please check the information provided");
        }
      })
      .catch(() => {
        setMessage("Unable to create event at this time");
      });
  };

  return (
    <>
      <div className="container">
        <form className="submission-form" onSubmit={handleSubmit}>
          <h1>Create a new event</h1>

          <label htmlFor="name" className="submission-form-children">
            Name:
          </label>
          <input
            type="text"
            value={name}
            minLength={1}
            placeholder="Name of Event"
            id="name"
            required
            onChange={(event) => {
              setName(event.target.value);
            }}
          />

          <label htmlFor="startDate" className="submission-form-children">
            Start Date:
          </label>
          <input
            type="datetime-local"
            required
            id="startDate"
            name="date"
            value={startDate.toISOString().slice(0, 16)}
            min={todayDateString}
            onChange={(event) => setStartDate(new Date(event.target.value))}
          />

          <label htmlFor="duration" className="submission-form-children">
            Duration in Hours:
          </label>
          <input
            type="number"
            value={duration}
            placeholder="Number of Hours eg. 2"
            id="duration"
            required
            step="any"
            onChange={(event) => {
              setDuration(parseInt(event.target.value));
            }}
          ></input>

          <label htmlFor="location" className="submission-form-children">
            Location:
          </label>
          <input
            type="text"
            value={location}
            minLength={2}
            placeholder="eg. John O' Groats"
            id="location"
            required
            onChange={(event) => {
              setLocation(event.target.value);
            }}
          />

          <label htmlFor="link" className="submission-form-children">
            Event Url:
          </label>
          <input
            type="url"
            value={link}
            id="link"
            required
            onChange={(event) => {
              setlink(event.target.value);
            }}
          ></input>

          <label htmlFor="imageUrl" className="submission-form-children">
            Event Image Url:
          </label>
          <input
            type="url"
            value={imageUrl}
            id="imageUrl"
            required
            onChange={(event) => {
              setimageUrl(event.target.value);
            }}
          ></input>

          <Button type="submit" className="submission-form-children">
            Submit
          </Button>
          <span className="error-message">{message}</span>
        </form>
      </div>
    </>
  );
};

export default EventForm;
