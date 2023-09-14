using WhaleSpotting.Enums;
using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Repositories;

namespace WhaleSpotting.Services;

public interface IPostService
{
    public Task<Post> Create(PostRequest newPostRequest);
    public Post GetById(int id);
    public List<Post> GetAll();
    public List<Post> GetPending();
    public void ApproveOrReject(Post post, ApprovalStatus approvalStatus);
    public void Modify(Post post, ModifyPostRequest modifyPostRequest);
}

public class PostService : IPostService
{
    private readonly IPostRepo _posts;

    public PostService(IPostRepo posts)
    {
        _posts = posts;
    }

    public async Task<Post> Create(PostRequest newPostRequest)
    {
        return await _posts.Create(newPostRequest);
    }

    public Post GetById(int id)
    {
        return _posts.GetById(id);
    }

    public List<Post> GetAll()
    {
        return _posts.GetAll();
    }

    public List<Post> GetPending()
    {
        return _posts.GetPending();
    }

    public void ApproveOrReject(Post post, ApprovalStatus approvalStatus)
    {
        _posts.ApproveOrReject(post, approvalStatus);
    }

    public void Modify(Post post, ModifyPostRequest modifyPostRequest)
    {
        _posts.Modify(post, modifyPostRequest);
    }
}
