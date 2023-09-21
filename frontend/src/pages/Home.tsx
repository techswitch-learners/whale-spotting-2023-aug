import EventandLeaderboardSection from "../components/Home/EventsAndLeaderboardSection";
import LatestPosts from "../components/Home/LatestPosts";
import Search from "../components/Home/Search";

export const Home = () => {
  return (
    <>
      <h1>Whale Spotting</h1>
      <LatestPosts />
      <Search />
      <EventandLeaderboardSection />

      {/* Footer */}
    </>
  );
};

export default Home;
