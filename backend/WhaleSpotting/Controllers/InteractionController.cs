using Microsoft.AspNetCore.Mvc;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Services;
using WhaleSpotting.Attributes;
using Microsoft.EntityFrameworkCore;

namespace WhaleSpotting.Controllers;

[ApiController]
[Route("[controller]")]
public class InteractionController : ControllerBase
{
    private readonly IInteractionService _interactionService;

    public InteractionController(IInteractionService interactionService)
    {
        _interactionService = interactionService;
    }

    [HttpPost("")]
    [RequiresUserAuth]
    public IActionResult Create(
        [FromBody] CreateInteractionRequest createInteractionRequest,
        [FromHeader] int userId
    )
    {
        try
        {
            _interactionService.Create(createInteractionRequest, userId);
            return Ok();
        }
        catch (ArgumentException)
        {
            return Conflict();
        }
        catch (DbUpdateException)
        {
            return BadRequest("Invalid post Id");
        }
    }
}
