import { BackendConnectionChecker } from "../components/BackendConnectionChecker";
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

      <BackendConnectionChecker />
    </>
  );
};

export default Home;
