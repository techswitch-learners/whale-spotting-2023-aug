using Microsoft.AspNetCore.Mvc;
using WhaleSpotting.Models.Response;
using WhaleSpotting.Services;
using WhaleSpotting.Attributes;

namespace WhaleSpotting.Controllers;

[ApiController]
[Route("[controller]")]
public class BodyOfWaterController : ControllerBase
{
    private readonly IBodyOfWaterService _bodyOfWaterService;

    public BodyOfWaterController(IBodyOfWaterService bodyOfWaterService)
    {
        _bodyOfWaterService = bodyOfWaterService;
    }

    [HttpGet("all")]
    public IActionResult GetAll()
    {
        var bodiesOfWater = _bodyOfWaterService.GetAll();
        return Ok(new BodiesOfWaterResponse(bodiesOfWater));
    }

    [HttpGet("{name}")]
    [AllowGuest]
    public IActionResult GetByName([FromRoute] string name, [FromHeader] int userId)
    {
        try
        {
            var bodyOfWater = _bodyOfWaterService.GetByName(name);
            return Ok(new BodyOfWaterResponse(bodyOfWater, userId));
        }
        catch (ArgumentException)
        {
            return NotFound();
        }
    }
}
