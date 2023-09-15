using WhaleSpotting.Models.Business;

namespace WhaleSpotting.Models.Response;

public class LeaderboardRowResponse
{
    public int? UserId { get; set; }
    public string? Username { get; set; }
    public int? Score { get; set; }

    public LeaderboardRowResponse(LeaderboardRow leaderboardRow)
    {
        UserId = leaderboardRow.UserId;
        Username = leaderboardRow.Username;
        Score = leaderboardRow.Score;
    }
}
