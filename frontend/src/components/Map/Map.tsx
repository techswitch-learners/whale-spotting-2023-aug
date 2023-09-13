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
  const [mapStyle, setMapStyle] = useState<"street" | "satellite">("street");

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

  const handleMapStyleChange = (style: "street" | "satellite") => {
    setMapStyle(style);
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

  const limitedData = sortedData?.slice(0, 3);

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

      <div className="map-style-options">
        <button
          onClick={() => handleMapStyleChange("street")}
          className={`map-style-button ${
            mapStyle === "street" ? "active" : ""
          }`}
        >
          Street
        </button>
        <button
          onClick={() => handleMapStyleChange("satellite")}
          className={`map-style-button ${
            mapStyle === "satellite" ? "active" : ""
          }`}
        >
          Satellite
        </button>
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
          url={
            mapStyle === "satellite"
              ? "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
              : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          }
          attribution={
            mapStyle === "satellite"
              ? '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> contributors'
              : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }
          maxZoom={18}
          id={mapStyle === "satellite" ? "mapbox/satellite-streets-v11" : ""}
          accessToken={
            mapStyle === "satellite"
              ? "pk.eyJ1IjoicmFmZWIiLCJhIjoiY2xtaG5kbWM4MmlsNjNjanIyMngxOHN3ZSJ9.u9SjYQOB5BXuSEt5RGif_Q"
              : undefined
          }
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
