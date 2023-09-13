using Microsoft.AspNetCore.Mvc;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Models.Response;
using WhaleSpotting.Services;

namespace WhaleSpotting.Controllers;

[ApiController]
[Route("[controller]")]
public class LeaderboardController : ControllerBase
{
    private readonly ILeaderboardService _leaderboardService;

    public LeaderboardController(ILeaderboardService leaderboardService)
    {
        _leaderboardService = leaderboardService;
    }

    [HttpGet("")]
    public IActionResult Get()
    {
        try
        {
            var leaderboard = _leaderboardService.Get();
            return Ok(new LeaderboardResponse(leaderboard));
        }
        catch (ArgumentException)
        {
            return NotFound();
        }
    }
}
