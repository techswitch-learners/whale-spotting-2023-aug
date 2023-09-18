using WhaleSpotting.Models.Business;

namespace WhaleSpotting.Models.Response;

public class LeaderboardResponse
{
    public List<LeaderboardRowResponse> Leaderboard { get; }

    public LeaderboardResponse(List<LeaderboardRow> leaderboard)
    {
        Leaderboard = leaderboard
            .Select(leaderboardRow => new LeaderboardRowResponse(leaderboardRow))
            .ToList();
    }
}
