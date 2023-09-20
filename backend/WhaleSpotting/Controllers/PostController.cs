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
            return Ok(new PostResponse(post));
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
            var posts = _postService.GetAll();
            return Ok(new PostsResponse(posts));
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

    [HttpGet("search")]
    public IActionResult Search([FromQuery] SearchPostsRequest searchPostsRequest)
    {
        try
        {
            var posts = _postService.Search(searchPostsRequest);
            return Ok(new PostsResponse(posts));
        }
        catch (ArgumentException)
        {
            return NotFound();
        }
    }
}
