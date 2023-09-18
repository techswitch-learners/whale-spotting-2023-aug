using WhaleSpotting.Models.Business;
using WhaleSpotting.Repositories;

namespace WhaleSpotting.Services;

public interface ILeaderboardService
{
    List<LeaderboardRow> Get();
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
        var leaderboard = users.Select(user => new LeaderboardRow(user)).ToList();
        leaderboard.Sort((rowA, rowB) => rowB.Score - rowA.Score);
        return leaderboard.Take(10).ToList();
    }
}
