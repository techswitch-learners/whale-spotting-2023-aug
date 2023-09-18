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

    [HttpGet("{id:int}")]
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
    public IActionResult Create([FromBody] CreateUserRequest createUserRequest)
    {
        try
        {
            var newUser = new UserResponse(_userService.Create(createUserRequest));
            return CreatedAtAction(nameof(GetById), new { id = newUser.Id }, newUser);
        }
        catch (ArgumentException exception)
        {
            return Conflict(exception.Message);
        }
    }
}
