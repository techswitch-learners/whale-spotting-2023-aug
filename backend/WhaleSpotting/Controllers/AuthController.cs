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
    private readonly IUserService _userService;

    public AuthController(IAuthService authService, IUserService userService)
    {
        _authService = authService;
        _userService = userService;
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

        if (_authService.IsCorrectUsernameAndPasswordCombination(auth.Username, auth.Password))
        {
            var user = _userService.GetByUsername(auth.Username);
            return Ok(new AuthResponse(user));
        }

        return Unauthorized("Incorrect username and password combination");
    }
}
