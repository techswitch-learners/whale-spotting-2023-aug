import { useState, FormEvent } from "react";
import Button from "../components/UI/Button";
import { createEvent } from "../clients/backendApiClient";

const EventsForm = () => {
  const today = new Date();
  const todayDateString = today.toISOString().slice(0, -4);

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [duration, setDuration] = useState<number>(NaN);
  const [location, setLocation] = useState<string>("");
  const [eventLink, setEventLink] = useState<string>("");
  const [eventImageUrl, setEventImageUrl] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(startDate, duration, location, eventLink, eventImageUrl);
    createEvent(startDate, duration, location, eventLink, eventImageUrl)
      .then(() => {
        setSuccessMessage("Thank you for your submission");
      })
      .catch(() => {
        setSuccessMessage("Please check the information provided");
      });
  };

  return (
    <>
      <div className="container">
        <form className="submission-form" onSubmit={handleSubmit}>
          <h1>Create a new event</h1>
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

          <label htmlFor="duration">Duration:</label>
          <input
            type="number"
            placeholder="Number of Days eg. 2"
            id="duration"
            required
            onChange={(event) => {
              setDuration(parseInt(event.target.value));
            }}
          ></input>

          <label htmlFor="location">Location:</label>
          <input
            type="text"
            placeholder="eg. John O' Groats"
            id="location"
            required
            onChange={(event) => {
              setLocation(event.target.value);
            }}
          />

          <label htmlFor="eventLink">Event Url:</label>
          <input
            type="url"
            id="eventLink"
            required
            onChange={(event) => {
              setEventLink(event.target.value);
            }}
          ></input>

          <label htmlFor="eventImageUrl">Event Image Url:</label>
          <input
            type="url"
            id="eventImageUrl"
            required
            onChange={(event) => {
              setEventImageUrl(event.target.value);
            }}
          ></input>

          <Button type="submit" className="submission-form-children">
            Submit
          </Button>
          <span className="error-message">{successMessage}</span>
        </form>
      </div>
    </>
  );
};

export default EventsForm;
