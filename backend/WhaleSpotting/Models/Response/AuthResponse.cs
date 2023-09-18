using WhaleSpotting.Enums;
using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Models.Response;

public class AuthResponse
{
    public int Id { get; }
    public Role Role { get; }

    public AuthResponse(User user)
    {
        Id = user.Id;
        Role = user.Role;
    }
}
