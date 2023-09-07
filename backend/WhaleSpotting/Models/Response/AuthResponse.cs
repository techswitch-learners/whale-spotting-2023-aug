using WhaleSpotting.Enums;
using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Models.Response;

public class AuthResponse
{
    public int Id { get; set; }
    public Role Role { get; set; }

    public AuthResponse(User user)
    {
        Id = user.Id;
        Role =
            user.Role
            ?? throw new ArgumentNullException(
                nameof(user),
                "Property \"Role\" must not be null"
            );


    }
}
