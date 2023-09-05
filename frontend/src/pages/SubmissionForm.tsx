const SubmissionForm = () => {
  // const DateTime now = DateTime.now();

  // const today = DateTime(now.year, now.month, now.day)
  return (
    <>
      <form>
        <h1>Submit a sighting</h1>
        <label htmlFor="date">Date of sighting</label>
        <input type="date" id="date" name="date" max={"05/09/2023"} />

        <label htmlFor="location">Location</label>

        <label htmlFor="species">Species</label>
        <select name="species" id="species">
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

        <label htmlFor="date">Description</label>
        <textarea id="description" rows={4} cols={50} name="description">
          {" "}
        </textarea>

        <form action="/action_page.php">
          <label htmlFor="date">Upload your image</label>
          <input type="file" id="myFile" name="filename" />
        </form>

        <input type="submit" />
      </form>
    </>
  );
};

export default SubmissionForm;
