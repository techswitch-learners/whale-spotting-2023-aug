using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Models.Business;

public class LeaderboardRow
{
    public User User { get; }
    public int Score { get; }
    public int PostCount { get; }

    public LeaderboardRow(User user)
    {
        User = user;
        Score = user.Posts.Sum(post => post.Interactions.Count);
        PostCount = user.Posts.Count;
    }
}
