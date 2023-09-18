using WhaleSpotting.Enums;
using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Repositories;

namespace WhaleSpotting.Services;

public interface IPostService
{
    Task<Post> Create(CreatePostRequest createPostRequest);
    Post GetById(int id);
    List<Post> GetAll();
    List<Post> GetPending();
    void ApproveOrReject(int id, ApprovalStatus approvalStatus);
    void Modify(int id, ModifyPostRequest modifyPostRequest);
}

public class PostService : IPostService
{
    private readonly IPostRepo _posts;

    public PostService(IPostRepo posts)
    {
        _posts = posts;
    }

    public async Task<Post> Create(CreatePostRequest createPostRequest)
    {
        return await _posts.Create(createPostRequest);
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
}
