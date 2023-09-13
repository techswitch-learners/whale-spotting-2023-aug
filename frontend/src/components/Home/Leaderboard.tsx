import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserData from "../../models/UserData";
import { getLeaderboard } from "../../clients/backendApiClient";
import "./Leaderboard.scss";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<UserData[]>();

  const getLeaderboardHandler = async () => {
    const response = await getLeaderboard();
    if (response) {
      setLeaderboard(response);
      //      console.log(response);
    }
  };

  useEffect(() => {
    getLeaderboardHandler();
  }, []);

  return (
    <section className="container">
      <div className="Leaderboard">
        <h3>Leaderboard</h3>
        <div>
          <table className="Leaderboard__Table">
            <tr>
              <th>User</th>
              <th>Name</th>
              <th>Total Posts</th>
              <th>Rating</th>
            </tr>
            {leaderboard &&
              leaderboard.map((user) => {
                return (
                  <tr>
                    {/* <td>⚪</td> */}
                    <td>
                      <img
                        className="User_Thumbnail"
                        src={user.profileImageUrl}
                        alt=""
                      />
                    </td>
                    <td>{user.name}</td>
                    <td>{user.posts.length}</td>
                    <td>{user.rating}</td>
                    <td>
                      <Link to={`/users/${user.id}`}>🔗</Link>
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
      </div>
    </section>
  );
}
