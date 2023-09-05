import w3w_logo from "../assets/w3w_logo.png";
import "./SubmissionForm.scss";

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

  return (
    <>
      <div className="submission-form-container">
        <form className="submission-form">
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
          </div>
          <input
            type="text"
            id="w3w"
            name="w3w"
            placeholder="Enter your what3words"
          />
          <span>or</span>
          <div className="latlon-container">
            <input type="text" id="lat" name="lat" placeholder="Latitude" />
            <input type="text" id="lon" name="lon" placeholder="Longitude" />
          </div>

          <label htmlFor="species" className="submission-form-children">
            Species
          </label>
          <select name="species" id="species" required>
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
          >
            {" "}
          </textarea>

          <label htmlFor="date" className="submission-form-children">
            Upload your image
          </label>
          <input
            type="file"
            id="myFile"
            name="filename"
            className="image-upload"
            required
          />

          <input type="submit" className="submission-form-children" />
        </form>
      </div>
    </>
  );
};

export default SubmissionForm;
