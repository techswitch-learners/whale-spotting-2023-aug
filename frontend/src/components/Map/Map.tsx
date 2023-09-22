import { useState, useEffect, useCallback, useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { getAllPosts, interactWithPost } from "../../clients/backendApiClient";
import { LoginContext } from "../../context/LoginManager";
import { icon } from "leaflet";
import Modal from "../UI/Modal";
import CardPostModal from "../Post/CardPostModal";
import Button from "../UI/Button";
import WhaleLoader from "../UI/WhaleLoader";
import PostData from "../../models/PostData";
import mapIcon from "../../assets/whaleIcon.svg";
import "./Map.scss";

const Icon = icon({
  iconUrl: mapIcon,
  iconSize: [36, 36],
});

const Map = () => {
  const [selectedPostDetails, setSelectedPostDetails] = useState<PostData>();
  const [postData, setPostData] = useState<PostData[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [sortMethod, setSortMethod] = useState<"date" | "interactions">("date");
  const [numMarkers, setNumMarkers] = useState<number>(20);
  const loginContext = useContext(LoginContext);

  const handleLike = async (postId: number) => {
    if (loginContext.isLoggedIn) {
      const interactionResult = await interactWithPost(
        postId,
        loginContext.encodedAuth,
      );
      if (interactionResult) {
        const updatedPosts = postData?.map((post) => {
          return post.id == postId
            ? {
                ...post,
                hasInteractionFromCurrentUser: true,
                interactionCount: post.interactionCount + 1,
              }
            : post;
        });
        setPostData(updatedPosts);

        if (selectedPostDetails) {
          const selectedPostData = updatedPosts?.find(
            (post) => post.id === selectedPostDetails.id,
          );
          setSelectedPostDetails(selectedPostData);
        }
      }
    }
  };

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    setPostData(undefined);
    setErrorMessage(undefined);

    await getAllPosts(loginContext.encodedAuth)
      .then((data) => setPostData(data.posts))
      .catch(() => setErrorMessage("Unable to load posts"));

    setIsLoading(false);
  }, [loginContext.encodedAuth]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortMethod(e.target.value as "date" | "interactions");
  };

  const handleNumMarkersChange = (num: number) => {
    setNumMarkers(num);
  };

  let sortedData = postData;

  if (sortMethod === "date") {
    sortedData = postData?.slice().sort((a, b) => {
      return (
        new Date(b.creationTimestamp).getTime() -
        new Date(a.creationTimestamp).getTime()
      );
    });
  } else if (sortMethod === "interactions") {
    sortedData = postData?.slice().sort((a, b) => {
      return b.interactionCount - a.interactionCount;
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
    <div className="filter-container container">
      <div className="options-container">
        <div className="sorting-options">
          <label htmlFor="sort-by">Sort by:</label>
          <select id="sort-by" onChange={handleSortChange} value={sortMethod}>
            <option value="date">Date</option>
            <option value="interactions">Interactions</option>
          </select>
        </div>

        <div className="marker-options">
          <label htmlFor="num-markers">Number of Sightings:</label>
          <select
            id="num-markers"
            onChange={(e) =>
              handleNumMarkersChange(parseInt(e.target.value) || 20)
            }
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
            <Marker
              key={index}
              position={[data.latitude, data.longitude]}
              icon={Icon}
            >
              <Popup className="custom-popup">
                <img
                  src={data.imageUrl}
                  alt={data.species.name}
                  className="image"
                  onClick={() => setSelectedPostDetails(data)}
                />
              </Popup>
            </Marker>
          ))}
      </MapContainer>
      {selectedPostDetails && (
        <Modal closeAction={() => setSelectedPostDetails(undefined)}>
          <CardPostModal postData={selectedPostDetails} likePost={handleLike} />
        </Modal>
      )}
    </div>
  );
};
export default Map;
