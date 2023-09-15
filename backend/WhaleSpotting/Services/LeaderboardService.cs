using WhaleSpotting.Models.Business;
using WhaleSpotting.Repositories;

namespace WhaleSpotting.Services;

public interface ILeaderboardService
{
    public List<LeaderboardRow> Get();
}

public class LeaderboardService : ILeaderboardService
{
    private readonly IUserRepo _users;

    public LeaderboardService(IUserRepo users)
    {
        _users = users;
    }

    public List<LeaderboardRow> Get()
    {
        var users = _users.GetAll();

        var leaderboard = new List<LeaderboardRow>();

        users.ForEach(user =>
        {
            // var likes = user.Posts != null ? post.Likes.Count : 0;
            var score = 0;

            if (user.Posts != null && user.Posts.Count > 0)
            {
                score = user.Posts.Sum(post => post.Likes.Count);
            }

            leaderboard.Add(new LeaderboardRow(user, score));
        });

        leaderboard.Sort((a, b) => b.Score - a.Score);

        return leaderboard;
    }
}
