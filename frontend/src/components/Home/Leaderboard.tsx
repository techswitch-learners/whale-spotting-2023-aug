import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLeaderboard } from "../../clients/backendApiClient";
import UserData from "../../models/UserData";
import "./EventsAndLeaderboardSection.scss";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<UserData[]>();

  const getLeaderboardHandler = async () => {
    const response = await getLeaderboard();
    if (response) {
      setLeaderboard(response);
    }
  };

  useEffect(() => {
    getLeaderboardHandler();
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
              <th>Rating</th>
              <th>Link</th>
            </tr>
            {leaderboard &&
              leaderboard.map((user) => {
                return (
                  <tr className="Board__Item">
                    <td>
                      <Link to={`/users/${user.id}`}>
                        <img
                          className="Item_Thumbnail"
                          src={user.profileImageUrl}
                          alt=""
                        />
                      </Link>
                    </td>
                    <td>{user.name}</td>
                    <td>{user.posts.length}</td>
                    <td>{user.rating ? user.rating : "9732"}</td>
                    <td className="Board__Item__svg">
                      <Link to={`/users/${user.id}`}>
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
              })}
          </table>
        </div>
      </div>
    </>
  );
}
