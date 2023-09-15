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
    public void ApproveOrReject(int id, ApprovalStatus approvalStatus);
    public void Modify(int id, ModifyPostRequest modifyPostRequest);
    public List<Post> GetByUserId(int userId);
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

    public void ApproveOrReject(int id, ApprovalStatus approvalStatus)
    {
        _posts.ApproveOrReject(id, approvalStatus);
    }

    public void Modify(int id, ModifyPostRequest modifyPostRequest)
    {
        _posts.Modify(id, modifyPostRequest);
    }

    public List<Post> GetByUserId(int userId)
    {
        return _posts.GetByUserId(userId);
    }
}
