import { BackendConnectionChecker } from "../components/BackendConnectionChecker";
import LatestPosts from "../components/Home/LatestPosts";
import Leaderboard from "../components/Home/Leaderboard";
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
      <LatestPosts />

      {/* Events */}

      {/* LeaderBoard */}
      <Leaderboard />

      {/* Footer */}

      <BackendConnectionChecker />
    </>
  );
};

export default Home;
