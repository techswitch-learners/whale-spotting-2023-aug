import EventandLeaderboardSection from "../components/Home/EventsAndLeaderboardSection";
import LatestPosts from "../components/Home/LatestPosts";
import SearchBy from "../components/Home/SearchBy";

export const Home = () => {
  return (
    <>
      <h1>Whale Spotting</h1>
      <LatestPosts />
      <SearchBy />

      <EventandLeaderboardSection />

      {/* Footer */}
    </>
  );
};

export default Home;
