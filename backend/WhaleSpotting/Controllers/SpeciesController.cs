using Microsoft.AspNetCore.Mvc;
using WhaleSpotting.Services;
using WhaleSpotting.Models.Response;

namespace WhaleSpotting.Controllers;

[ApiController]
[Route("[controller]")]
public class SpeciesController : ControllerBase
{
    private readonly ISpeciesService _speciesService;

    public SpeciesController(ISpeciesService speciesService)
    {
        _speciesService = speciesService;
    }

    [HttpGet("all")]
    public IActionResult GetAll()
    {
        var species = _speciesService.GetAll();
        return Ok(new SpeciesListResponse(species));
    }

    [HttpGet("{name}")]
    public IActionResult GetByName([FromRoute] string name)
    {
        try
        {
            var species = _speciesService.GetByName(name);
            return Ok(new SpeciesResponse(species));
        }
        catch (ArgumentException)
        {
            return NotFound();
        }
    }
}
