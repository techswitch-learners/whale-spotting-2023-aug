using Microsoft.AspNetCore.Mvc;
using WhaleSpotting.Helpers;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Models.Response;
using WhaleSpotting.Services;
using WhaleSpotting.Annotations;
using System.Reflection;

namespace WhaleSpotting.Controllers;

[ApiController]
[Route("[controller]")]
public class InteractionController : ControllerBase
{
    private readonly IInteractionService _interactionService;
    private readonly IAuthService _authService;
    private readonly IUserService _userService;

    public InteractionController(
        IInteractionService interactionService,
        IAuthService authService,
        IUserService userService
    )
    {
        _interactionService = interactionService;
        _authService = authService;
        _userService = userService;
    }

    [HttpPost("")]
    [AuthorizeUser]
    public IActionResult Create(
        [FromBody] InteractionRequest newInteractionRequest,
        [FromHeader] string authorization
    )
    {
        (string Username, string Password) auth;
        auth = AuthHelper.ExtractFromAuthHeader(authorization);

        try
        {
            var user = _userService.GetByUsername(auth.Username);
            _interactionService.Create(newInteractionRequest, user.Id);
            return Ok();
        }
        catch (ArgumentException)
        {
            return StatusCode(409);
        }
    }
}
