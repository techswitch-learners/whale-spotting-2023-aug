import { useEffect, useState } from "react";
import UserData from "../../models/UserData";
import { getLeaderboard } from "../../clients/backendApiClient";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<UserData[]>();

  const getLeaderboardHandler = async () => {
    const response = await getLeaderboard();
    if (response) {
      setLeaderboard(response);
      console.log(response);
    }
  };

  useEffect(() => {
    getLeaderboardHandler();
  }, []);

  return (
    // <section>
    <div className="Leaderboard">
      <h3>Leaderboard</h3>
      <div>
        <table className="Leaderboard__Table">
          <tr>
            <th></th>
            <th>Name</th>
            <th>Total Posts</th>
            <th>Rating</th>
          </tr>
          {leaderboard &&
            leaderboard.map((user) => {
              return (
                <tr>
                  <td>⚪</td>
                  <td>{user.name}</td>
                  <td>{user.posts.length}</td>
                  <td>{user.rating}</td>
                  <td>🔗</td>
                </tr>
              );
            })}
        </table>
      </div>
    </div>
    // </section>
  );
}
