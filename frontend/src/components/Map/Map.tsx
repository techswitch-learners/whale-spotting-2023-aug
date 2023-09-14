import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import PostDataMap from "../../models/PostDataMap";
import Modal from "../UI/Modal";
import CardPostModal from "../Post/CardPostModal";
import "./Map.scss";
import { getAllPosts } from "../../clients/backendApiClient";
import Button from "../UI/Button";
import WhaleLoader from "../UI/WhaleLoader";

const Map: React.FC = () => {
  const [selectedPostDetails, setSelectedPostDetails] = useState<PostDataMap>();
  const [postData, setPostData] = useState<PostDataMap[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [sortMethod, setSortMethod] = useState<"date" | "rating">("date");
  const [numMarkers, setNumMarkers] = useState<number>(20);

  const fetchPosts = async () => {
    setIsLoading(true);
    setPostData(undefined);
    setErrorMessage(undefined);

    await getAllPosts()
      .then((data) => setPostData(data.posts))
      .catch(() => setErrorMessage("Unable to load posts"));

    setIsLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortMethod(e.target.value as "date" | "rating");
  };

  const handleNumMarkersChange = (num: number) => {
    setNumMarkers(num);
  };

  let sortedData = postData;

  if (sortMethod === "date") {
    sortedData = postData?.slice().sort((a, b) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
  } else if (sortMethod === "rating") {
    sortedData = postData?.slice().sort((a, b) => {
      return b.rating - a.rating;
    });
  }

  const limitedData = sortedData?.slice(0, numMarkers);

  if (isLoading || errorMessage) {
    return (
      <main>
        <section className="section-dark">
          <div className="container Posts__loader">
            <WhaleLoader
              isLoading={isLoading}
              message={isLoading ? "Loading..." : errorMessage}
            />
            {errorMessage && <Button onClick={fetchPosts}>Try Again</Button>}
          </div>
        </section>
      </main>
    );
  }

  return (
    <div>
      <div className="sorting-options">
        <label htmlFor="sort-by">Sort by:</label>
        <select id="sort-by" onChange={handleSortChange} value={sortMethod}>
          <option value="date">Date</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      <div className="marker-options">
        <label htmlFor="num-markers">Number of Sightings:</label>
        <select
          id="num-markers"
          onChange={(e) => handleNumMarkersChange(Number(e.target.value))}
          value={numMarkers}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
        </select>
      </div>

      <MapContainer
        center={[51.505, -0.09]}
        zoom={3}
        style={{
          width: "100%",
          height: "60vh",
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {limitedData &&
          limitedData.map((data, index) => (
            <Marker key={index} position={[data.latitude, data.longitude]}>
              <Popup className="custom-popup">
                <div className="container">
                  <img
                    src={data.imageUrl}
                    alt={data.species.name}
                    className="image"
                    onClick={() => setSelectedPostDetails(data)}
                  />
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>

      {selectedPostDetails && (
        <Modal closeAction={() => setSelectedPostDetails(undefined)}>
          <CardPostModal postData={selectedPostDetails} />
        </Modal>
      )}
    </div>
  );
};

export default Map;
