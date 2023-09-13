import EventandLeaderboardSection from "../components/Home/EventandLeaderboardSection";
import LatestPosts from "../components/Home/LatestPosts";

import SearchBySea from "../components/Home/SearchBySea";

export const Home = () => {
  return (
    <>
      <SearchBySea />
      <LatestPosts />
      <EventandLeaderboardSection />

      {/* Footer */}
    </>
  );
};

export default Home;
