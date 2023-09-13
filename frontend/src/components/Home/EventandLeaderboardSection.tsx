import Events from "./Events";
import Leaderboard from "./Leaderboard";
import "./EventandLeaderboardSection.scss";

export default function LeaderEventandLeaderboardSectionboard() {
  return (
    <section className="container EventsandLeaderboard">
      <Events />
      <Leaderboard />
    </section>
  );
}
