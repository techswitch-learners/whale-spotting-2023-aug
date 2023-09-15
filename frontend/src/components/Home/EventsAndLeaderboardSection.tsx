import Events from "./Events";
import Leaderboard from "./Leaderboard";
import "./EventsAndLeaderboardSection.scss";

const EventsAndLeaderboardSection = () => {
  return (
    <section className="container EventsAndLeaderboard">
      <Events />
      <Leaderboard />
    </section>
  );
};

export default EventsAndLeaderboardSection;
