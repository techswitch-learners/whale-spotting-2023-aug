import { useState, FormEvent, useContext, useEffect } from "react";
import Button from "../components/UI/Button";
import { createEvent } from "../clients/backendApiClient";
import "./EventForm.scss";
import { LoginContext } from "../context/LoginManager";
import { useNavigate } from "react-router-dom";

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
    }
  }, [loginContext.isLoggedIn, navigate]);

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

          <label htmlFor="location" className="submission-form-children">
            Name:
          </label>
          <input
            type="text"
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
            Duration:
          </label>
          <input
            type="number"
            placeholder="Number of Hours eg. 2"
            id="duration"
            required
            onChange={(event) => {
              setDuration(parseInt(event.target.value));
            }}
          ></input>

          <label htmlFor="location" className="submission-form-children">
            Location:
          </label>
          <input
            type="text"
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
