using Microsoft.AspNetCore.Mvc;
using WhaleSpotting.Enums;
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
        try
        {
            var posts = _postService.GetPending();
            return Ok(new PostsResponse(posts));
        }
        catch (ArgumentException)
        {
            return NotFound();
        }
    }

    [HttpPost("")]
    public async Task<IActionResult> Create([FromBody] PostRequest newPostRequest)
    {
        var newPost = new PostResponse(await _postService.Create(newPostRequest));
        return CreatedAtAction(nameof(GetById), new { id = newPost.Id }, newPost);
    }

    [HttpPatch("")]
    public IActionResult ApproveReject([FromBody] ApproveRejectRequest newApproveRejectRequest)
    {
        try
        {
            var newRequest = newApproveRejectRequest;
            var post = _postService.GetById(newRequest.id);
            _postService.ApproveReject(post, (ApprovalStatus)newRequest.approvalStatus);

            return Ok();
        }
        catch (ArgumentException)
        {
            return NotFound();
        }
    }

    [HttpPatch("modify")]
    public IActionResult Modify([FromBody] ModifyPostRequest newModifyPostRequest)
    {
        try
        {
            var newRequest = newModifyPostRequest;
            var post = _postService.GetById(newRequest.id);
            _postService.Modify(post, newRequest);

            return Ok();
        }
        catch (ArgumentException)
        {
            return NotFound();
        }
    }
}
