using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Models.Response;

public class UserResponse
{
    public int Id { get; set; }
    public string Username { get; set; }

    public UserResponse(User user)
    {
        Id = user.Id;
        Username =
            user.Username
            ?? throw new ArgumentNullException(
                nameof(user),
                "Property \"Username\" must not be null"
            );
    }
}
