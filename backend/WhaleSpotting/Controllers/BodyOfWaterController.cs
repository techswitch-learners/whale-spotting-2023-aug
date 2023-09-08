using Microsoft.AspNetCore.Mvc;
using WhaleSpotting.Models.Response;
using WhaleSpotting.Services;

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
    public IActionResult GetByName([FromRoute] string name)
    {
        try
        {
            var bodyOfWater = _bodyOfWaterService.GetByName(name);
            return Ok(new BodyOfWaterResponse(bodyOfWater));
        }
        catch (ArgumentException)
        {
            return NotFound();
        }
    }
}
