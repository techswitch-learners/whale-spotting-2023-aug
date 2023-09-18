import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLeaderboard } from "../../clients/backendApiClient";
import LeaderboardRowData from "../../models/LeaderboardRowData";
import WhaleLoader from "../UI/WhaleLoader";
import "./EventsAndLeaderboardSection.scss";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardRowData[]>();
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    getLeaderboard()
      .then((data) => setLeaderboard(data.leaderboard))
      .catch(() => setError(true));
  }, []);

  return (
    <>
      <div className="Board">
        <h3 className="Board__Title">Leaderboard</h3>
        <hr className="Board__Divider" />
        <div>
          <table className="Board__Table">
            <tr>
              <th>User</th>
              <th>Name</th>
              <th>Posts</th>
              <th>Interactions</th>
              <th>Link</th>
            </tr>
            {leaderboard ? (
              leaderboard.map((row) => {
                return (
                  <tr className="Board__Item">
                    <td>
                      <Link to={`/users/${row.user.id}`}>
                        <img
                          className="Item_Thumbnail"
                          src={row.user.profileImageUrl}
                          alt=""
                        />
                      </Link>
                    </td>
                    <td>{row.user.username}</td>
                    <td>{row.postCount}</td>
                    <td>{row.score}</td>
                    <td className="Board__Item__svg">
                      <Link to={`/users/${row.user.id}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                          />
                        </svg>
                      </Link>
                    </td>
                  </tr>
                );
              })
            ) : (
              <WhaleLoader
                isLoading={!error}
                message={
                  error
                    ? "Could not load leaderboard at this time"
                    : "Loading..."
                }
              />
            )}
          </table>
        </div>
      </div>
    </>
  );
}
