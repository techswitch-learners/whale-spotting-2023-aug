import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import PostDataMap from "../../models/PostDataMap";
import PostData from "../../models/PostData";
import Modal from "../UI/Modal";
import CardPostModal from "../Post/CardPostModal";

// import FeaturedPostContent from "../components/Post/FeaturedPostContent";
// import FeaturedFrame from "../components/UI/FeaturedFrame";
import "./Map.scss";

const postDataMap: PostDataMap[] = [
  {
    imageUrl:
      "https://hips.hearstapps.com/hmg-prod/images/where-to-go-whale-watching-virginia-1522419979.jpg?resize=1200:*",
    species: "Humpback",
    username: "Ariel",
    sightingDate: "04 September 2023",
    likes: 22100,
    longitude: -42.170334,
    latitude: 35.208618,
    whaleName: "Tom",
  },
  {
    imageUrl:
      "https://www.wildlifeworldwide.com/images/home/whale_watching_grey_baja.jpg?",
    username: "Ariel",
    species: "humpback",
    sightingDate: "04 September 2023",
    likes: 22234,
    longitude: 0,
    latitude: 0,
    whaleName: "Lucy",
  },
  {
    imageUrl:
      "https://hips.hearstapps.com/hmg-prod/images/where-to-go-whale-watching-virginia-1522419979.jpg?resize=1200:*",
    username: "Nemo",
    species: "humpback",
    sightingDate: "03 September 2023",
    likes: 22399,
    longitude: -2.016773,
    latitude: 45.462697,
    whaleName: "Bob",
  },
];

const Map: React.FC = () => {
  const [selectedPostDetails, setSelectedPostDetails] = useState<PostData>();

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
        {postDataMap.map((data, index) => (
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
          <CardPostModal postData={selectedPostDetails} />
        </Modal>
      )}
    </div>
  );
};

export default Map;
