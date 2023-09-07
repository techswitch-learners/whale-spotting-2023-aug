using Microsoft.AspNetCore.Mvc;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Models.Response;
using WhaleSpotting.Services;

namespace WhaleSpotting.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet("id/{id:int}")]
    public IActionResult GetById([FromRoute] int id)
    {
        try
        {
            var user = _userService.GetById(id);
            return Ok(new UserResponse(user));
        }
        catch (ArgumentException)
        {
            return NotFound();
        }
    }

    [HttpGet("username/{username}")]
    public IActionResult GetByUsername([FromRoute] string username)
    {
        try
        {
            var user = _userService.GetByUsername(username);
            return Ok(new UserResponse(user));
        }
        catch (ArgumentException)
        {
            return NotFound();
        }
    }

    [HttpGet("all")]
    public IActionResult GetAll()
    {
        try
        {
            var users = _userService.GetAll();
            return Ok(new UsersResponse(users));
        }
        catch (ArgumentException)
        {
            return NotFound();
        }
    }

    [HttpPost("")]
    public IActionResult Create([FromBody] UserRequest newUserRequest)
    {
        var newUser = new UserResponse(_userService.Create(newUserRequest));
        return CreatedAtAction(nameof(GetById), new { id = newUser.Id }, newUser);
    }
}
