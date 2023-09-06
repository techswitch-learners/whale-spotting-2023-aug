using Microsoft.AspNetCore.Mvc;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Models.Response;
using WhaleSpotting.Services;

namespace WhaleSpotting.Controllers;

[ApiController]
[Route("[controller]")]
public class PostController : ControllerBase
{
    private readonly IPostService _postService;

    public PostController(IPostService postService)
    {
        _postService = postService;
    }

    [HttpGet("{id:int}")]
    public IActionResult GetById([FromRoute] int id)
    {
        try
        {
            var post = _postService.GetById(id);
            Console.WriteLine(post.Description);
            return Ok(new PostResponse(post));
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return NotFound();
        }
    }

    [HttpPost("")]
    public IActionResult Create([FromBody] PostRequest newPostRequest)
    {
        var newPost = new PostResponse(_postService.Create(newPostRequest));
        return CreatedAtAction(nameof(GetById), new { id = newPost.Id }, newPost);
    }
}
