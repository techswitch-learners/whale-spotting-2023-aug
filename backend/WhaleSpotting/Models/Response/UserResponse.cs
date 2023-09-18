using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Models.Response;

public class UserResponse
{
    public class UserPost
    {
        public int Id { get; }
        public string ImageUrl { get; }
        public string Description { get; }
        public int InteractionCount { get; }

        public UserPost(Post post)
        {
            Id = post.Id;
            ImageUrl = post.ImageUrl;
            Description = post.Description;
            InteractionCount = post.Interactions.Count;
        }
    }

    public int Id { get; }
    public string Username { get; }
    public string Email { get; }
    public string Name { get; }
    public string ProfileImageUrl { get; }
    public List<UserPost> Posts { get; }

    public UserResponse(User user)
    {
        Id = user.Id;
        Username = user.Username;
        Email = user.Email;
        Name = user.Name;
        ProfileImageUrl = user.ProfileImageUrl;
        Posts = user.Posts.Select(post => new UserPost(post)).ToList();
    }
}
