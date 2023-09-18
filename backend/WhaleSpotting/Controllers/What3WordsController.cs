using Microsoft.AspNetCore.Mvc;
using WhaleSpotting.Models.Api;

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
        _client = new HttpClient();
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
                return Ok(response.Coordinates);
            }
            return NotFound();
        }
        catch (HttpRequestException)
        {
            return NotFound();
        }
    }
}
