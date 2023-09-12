import { useState, useEffect } from "react";
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
      <MapContainer
        center={[51.505, -0.09]}
        zoom={3}
        style={{ height: "500px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {postData.map((data, index) => (
          <Marker key={index} position={[data.latitude, data.longitude]}>
            <Popup className="custom-popup">
              <div className="container">
                <img
                  src={data.imageUrl}
                  alt={data.species}
                  className="image"
                  onClick={() => setSelectedPostDetails(data)}
                />
                {/* {<p className="whale-name">{data.whaleName}</p>} */}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {selectedPostDetails && (
        <Modal closeAction={() => setSelectedPostDetails(undefined)}>
          <CardPostModal postDataMap={selectedPostDetails} />
        </Modal>
      )}
    </div>
  );
};

export default Map;
