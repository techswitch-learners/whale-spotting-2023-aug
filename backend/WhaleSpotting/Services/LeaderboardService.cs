using Microsoft.AspNetCore.Mvc;
using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Models.View;
using WhaleSpotting.Repositories;

namespace WhaleSpotting.Services;

public interface ILeaderboardService
{
    public List<LeaderLine> Get();
}

public class LeaderboardService : ILeaderboardService
{
    private readonly IUserRepo _users;

    public LeaderboardService(IUserRepo users)
    {
        _users = users;
    }

    public List<LeaderLine> Get()
    {
        var users = _users.GetAll();

        var leaderboard = new List<LeaderLine>();

        users.ForEach(user =>
        {
            // var likes = user.Posts != null ? post.Likes.Count : 0;
            var score = 0;

            if (user.Posts != null && user.Posts.Count > 0)
            {
                score = user.Posts.Sum(post => post.Likes.Count);
            }

            leaderboard.Add(new LeaderLine(user, score));
        });

        leaderboard.Sort((a, b) => b.Score - a.Score);

        return leaderboard;
    }
}
