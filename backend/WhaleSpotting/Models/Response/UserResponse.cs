using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Models.Response;

public class UserResponse
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string Name { get; set; }
    public string ProfileImageUrl { get; set; }
    public List<Post> Posts {get; set;}

    public UserResponse(User user)
    {
        Id = user.Id;
        Username =
            user.Username
            ?? throw new ArgumentNullException(
                nameof(user),
                "Property \"Username\" must not be null"
            );
        Email =
            user.Email
            ?? throw new ArgumentNullException(
                nameof(user),
                "Property \"Email\" must not be null"
            );
        Name =
            user.Name
            ?? throw new ArgumentNullException(
                nameof(user),
                "Property \"Name\" must not be null"
            );
        ProfileImageUrl =
            user.ProfileImageUrl
            ?? throw new ArgumentNullException(
                nameof(user),
                "Property \"ProfileImageUrl\" must not be null"
            );
        Posts = 
            user.Posts
            ?? throw new ArgumentNullException(
                nameof(user),
                "Property \"Posts\" must not be null"
            );
    }
}
