using Microsoft.AspNetCore.Mvc;
using WhaleSpotting.Models.Request;
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
    public IActionResult GetAllWaters()
    {
        try
        {
            var bodyOfWaters = _bodyOfWaterService.GetAllWaters();
            return Ok(new BodyOfWatersResponse(bodyOfWaters));
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return NotFound();
        }
    }

    [HttpGet("{name}")]
    public IActionResult GetByName([FromRoute] string name)
    {
        try
        {
            var bodyOfWater = _bodyOfWaterService.GetByName(name);
            return Ok(new BodyOfWaterResponse(bodyOfWater));
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return NotFound();
        }
    }


}
