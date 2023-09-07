using Microsoft.AspNetCore.Mvc;
using WhaleSpotting.Helpers;
using WhaleSpotting.Models.Api;
using WhaleSpotting.Services;

namespace WhaleSpotting.Controllers;

[ApiController]
[Route("[controller]")]
public class What3WordsController : ControllerBase
{
    private readonly IConfiguration _config;
    private readonly HttpClient _client;

    public What3WordsController(IConfiguration config)
    {
        _config = config;
        _client = new();
    }

    [HttpGet("")]
    public async Task<IActionResult> GetLatitudeAndLongitude([FromQuery] string words)
    {
        var what3WordsApiKey = _config["What3WordsApiKey"];
        try
        {
            var response = await _client.GetFromJsonAsync<What3WordsLocation>(
                $"https://api.what3words.com/v3/convert-to-coordinates?words={words}&key={what3WordsApiKey}"
            );
            if (response?.Coordinates != null)
            {
                return Ok(response?.Coordinates);
            }
            else
            {
                return NotFound();
            }
        }
        catch (HttpRequestException)
        {
            return NotFound();
        }
    }
}
