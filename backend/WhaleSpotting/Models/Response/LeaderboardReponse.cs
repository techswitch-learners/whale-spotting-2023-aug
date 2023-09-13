using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.View;

namespace WhaleSpotting.Models.Response;

public class LeaderboardResponse
{
    public List<LeaderlineResponse> Leaderboard { get; set; }

    public LeaderboardResponse(List<LeaderLine> leaderboard)
    {
        Leaderboard = leaderboard.Select(leaderline => new LeaderlineResponse(leaderline)).ToList();
    }
}
