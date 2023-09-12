import { BackendConnectionChecker } from "../components/BackendConnectionChecker";
import LatestPosts from "../components/Home/LatestPosts";
import SearchBySea from "../components/Home/SearchBySea";

export const Home = () => {
  return (
    <>
      {/* <section className="section-dark">
        <div className="container">
          <img src="./slider-placeholder.jpg" alt="" />
        </div>
      </section> */}

      <SearchBySea />
      {/* Search Component */}

      {/* Latest Spottings */}

      {/* Events */}

      {/* LeaderBoard */}

      {/* Footer */}

      <LatestPosts />

      <BackendConnectionChecker />
    </>
  );
};

export default Home;
