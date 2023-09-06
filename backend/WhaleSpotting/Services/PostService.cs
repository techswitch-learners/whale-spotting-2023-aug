using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Repositories;

namespace WhaleSpotting.Services;

public interface IPostService
{
    public Post Create(PostRequest newPostRequest);
    public Post GetById(int id);
}

public class PostService : IPostService
{
    private readonly IPostRepo _posts;

    public PostService(IPostRepo posts)
    {
        _posts = posts;
    }

    public Post Create(PostRequest newPostRequest)
    {
        return _posts.Create(newPostRequest);
    }

    public Post GetById(int id)
    {
        return _posts.GetById(id);
    }
}
