using Microsoft.AspNetCore.Mvc;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Services;
using WhaleSpotting.Attributes;

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
        [FromBody] InteractionRequest newInteractionRequest,
        [FromHeader] int UserId
    )
    {
        try
        {
            _interactionService.Create(newInteractionRequest, UserId);
            return Ok();
        }
        catch (ArgumentException)
        {
            return Conflict();
        }
    }
}
