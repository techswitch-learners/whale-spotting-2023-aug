using Microsoft.AspNetCore.Mvc;
using WhaleSpotting.Helpers;
using WhaleSpotting.Services;
using WhaleSpotting.Models.Response;

namespace WhaleSpotting.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpGet("")]
    public IActionResult IsValidAuth([FromHeader] string authorization)
    {
        (string Username, string Password) auth;

        try
        {
            auth = AuthHelper.ExtractFromAuthHeader(authorization);
        }
        catch (ArgumentException)
        {
            return Unauthorized("Invalid authorization header");
        }

        var user = _authService.GetUser(auth.Username, auth.Password);
        if (user != null)
        {
            return Ok(new AuthResponse(user));
        }

        return Unauthorized("Incorrect username and password combination");
    }
}
