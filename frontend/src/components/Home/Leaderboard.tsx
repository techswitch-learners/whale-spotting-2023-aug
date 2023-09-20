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
          <div className="Board__Table">
            {leaderboard ? (
              <>
                <div className="Board__Table__Row">
                  <div className="Board__Table__Row__Item Board__Table__Row__Item--heading">
                    User
                  </div>
                  <div className="Board__Table__Row__Item Board__Table__Row__Item--heading">
                    Name
                  </div>
                  <div className="Board__Table__Row__Item Board__Table__Row__Item--heading">
                    Posts
                  </div>
                  <div className="Board__Table__Row__Item Board__Table__Row__Item--heading">
                    Likes
                  </div>
                </div>
                {leaderboard.map((row) => (
                  <Link to={`/users/${row.user.id}`}>
                    <div className="Board__Table__Row">
                      <div className="Board__Table__Row__Item">
                        <Link to={`/users/${row.user.id}`}>
                          <img
                            className="Item_Thumbnail"
                            src={row.user.profileImageUrl}
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="Board__Table__Row__Item">
                        {row.user.username}
                      </div>
                      <div className="Board__Table__Row__Item">
                        {row.postCount}
                      </div>
                      <div className="Board__Table__Row__Item">{row.score}</div>
                    </div>
                  </Link>
                ))}
              </>
            ) : (
              <div className="Board__Table__Row">
                <WhaleLoader
                  isLoading={!error}
                  message={
                    error
                      ? "Could not load leaderboard at this time"
                      : "Loading..."
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
