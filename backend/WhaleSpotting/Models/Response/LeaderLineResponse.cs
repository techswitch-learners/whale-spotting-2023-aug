using WhaleSpotting.Enums;
using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.View;

namespace WhaleSpotting.Models.Response;

public class LeaderlineResponse
{
    public int? UserId { get; set; }
    public string? UserName { get; set; }
    public int? Score { get; set; }

    public LeaderlineResponse(LeaderLine leaderline)
    {
        UserId = leaderline.UserId;
        UserName = leaderline.UserName;
        Score = leaderline.Score;
    }
}
