import EventandLeaderboardSection from "../components/Home/EventsAndLeaderboardSection";
import LatestPosts from "../components/Home/LatestPosts";
import SearchBySea from "../components/Home/SearchBySea";

export const Home = () => {
  return (
    <>
      <h1>Whale Spotting</h1>
      <LatestPosts />
      <SearchBySea />
      <EventandLeaderboardSection />

      {/* Footer */}
    </>
  );
};

export default Home;
