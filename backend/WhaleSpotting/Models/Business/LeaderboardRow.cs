using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Models.Business;

public class LeaderboardRow
{
    public int? UserId { get; set; }
    public string? Username { get; set; }
    public int Score { get; set; }
    public string? UserProfileImageUrl { get; set; }
    public int? PostCount { get; set; }

    public LeaderboardRow(User user, int score)
    {
        UserId = user.Id;
        Username = user.Username;
        Score = score;
        UserProfileImageUrl = user.ProfileImageUrl;
        PostCount = user.Posts.Count;
    }
}
