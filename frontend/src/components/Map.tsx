// import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import PostDataMap from "../models/PostDataMap";
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
  },
  {
    imageUrl:
      "https://www.wildlifeworldwide.com/images/home/whale_watching_grey_baja.jpg",
    username: "Ariel",
    species: "humpback",
    sightingDate: "04 September 2023",
    likes: 22234,
    longitude: 15.824178,
    latitude: -30.13351,
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
  },
];

const Map: React.FC = () => {
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
                <h2>Featured Sighting</h2>
                <img src={data.imageUrl} alt={data.species} className="image" />
                <p>Species: {data.species}</p>
                <p className="username">Username: {data.username}</p>
                <p className="date">Sighting Date: {data.sightingDate}</p>
                <p className="likes">Likes: {data.likes}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
