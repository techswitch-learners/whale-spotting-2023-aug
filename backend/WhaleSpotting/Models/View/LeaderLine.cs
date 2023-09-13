using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Models.View;

public class LeaderLine
{
    public int? UserId { get; set; }
    public string? UserName { get; set; }
    public int Score { get; set; }

    public LeaderLine(User user, int score)
    {
        UserId = user.Id;
        UserName = user.Username;
        Score = score;
    }
}
