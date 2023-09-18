using WhaleSpotting.Models.Business;

namespace WhaleSpotting.Models.Response;

public class LeaderboardRowResponse
{
    public UserResponse User { get; }
    public int Score { get; }
    public int PostCount { get; }

    public LeaderboardRowResponse(LeaderboardRow leaderboardRow)
    {
        User = new UserResponse(leaderboardRow.User);
        Score = leaderboardRow.Score;
        PostCount = leaderboardRow.PostCount;
    }
}
