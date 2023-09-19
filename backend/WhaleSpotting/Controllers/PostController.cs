using Microsoft.AspNetCore.Mvc;
using WhaleSpotting.Attributes;
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
            return Ok(new PostResponse(post));
        }
        catch (ArgumentException)
        {
            return NotFound();
        }
    }

    [HttpGet("all")]
    [AllowGuest]
    public IActionResult GetAll([FromHeader] int userId)
    {
        try
        {
            var posts = _postService.GetAll();
            return Ok(new PostsResponse(posts, userId));
        }
        catch (ArgumentException)
        {
            return NotFound();
        }
    }

    [HttpGet("pending")]
    public IActionResult GetPending()
    {
        var posts = _postService.GetPending();
        return Ok(new PostsResponse(posts));
    }

    [HttpPost("")]
    public async Task<IActionResult> Create([FromBody] CreatePostRequest createPostRequest)
    {
        var newPost = new PostResponse(await _postService.Create(createPostRequest));
        return CreatedAtAction(nameof(GetById), new { id = newPost.Id }, newPost);
    }

    [HttpPatch("{id:int}")]
    public IActionResult ApproveOrReject(
        [FromRoute] int id,
        [FromBody] ApproveOrRejectPostRequest approveOrRejectPostRequest
    )
    {
        try
        {
            _postService.ApproveOrReject(id, approveOrRejectPostRequest.ApprovalStatus);
            return Ok();
        }
        catch (ArgumentException)
        {
            return NotFound();
        }
    }

    [HttpPut("{id:int}")]
    public IActionResult Modify([FromRoute] int id, [FromBody] ModifyPostRequest modifyPostRequest)
    {
        try
        {
            _postService.Modify(id, modifyPostRequest);
            return Ok();
        }
        catch (ArgumentException)
        {
            return NotFound();
        }
    }
}
