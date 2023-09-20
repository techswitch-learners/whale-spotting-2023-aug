using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Models.Response;

public class UserResponse
{
    public int Id { get; }
    public string Username { get; }
    public string Email { get; }
    public string Name { get; }
    public string ProfileImageUrl { get; }
    public List<PostResponse> Posts { get; }

    public UserResponse(User user, int? userId = null)
    {
        Id = user.Id;
        Username = user.Username;
        Email = user.Email;
        Name = user.Name;
        ProfileImageUrl = user.ProfileImageUrl;
        Posts = user.Posts.Select(post => new PostResponse(post, userId)).ToList();
    }
}
