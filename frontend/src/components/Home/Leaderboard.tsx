// import { useEffect, useState } from "react";
// import UserData from "../../models/UserData";
// import { getLeaderboard } from "../../clients/backendApiClient";

export default function Leaderboard() {
  // const [leaderboard, setLeaderboard] = useState<UserData[]>();

  // const getLeaderboardHandler = async () => {
  //     const response = await getLeaderboard();
  //     if (response) {
  //         setLeaderboard(response);
  //         console.log(response); //temporary
  //     }
  // }

  // useEffect(() => {
  //     getLeaderboardHandler();
  // }, []);

  return (
    <section className="Leaderboard container">
      <h2>Leaderboard</h2>
      {/* <div>
                 {leaderboard && 
                    leaderboard.map((user) => {
                        return (

                        )
                    }                
                )}
            </div> */}
    </section>
  );
}
