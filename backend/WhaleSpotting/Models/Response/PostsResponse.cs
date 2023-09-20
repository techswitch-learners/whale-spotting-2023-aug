using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Models.Response;

public class PostsResponse
{
    public List<PostResponse> Posts { get; }

    public PostsResponse(List<Post> posts, int? userId = null)
    {
        Posts = posts.Select(post => new PostResponse(post, userId)).ToList();
    }
}
