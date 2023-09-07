using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Models.Response;

public class UsersResponse
{
    public List<UserResponse> Users { get; set; }

    public UsersResponse(List<User> users)
    {
        Users = users.Select(user => new UserResponse(user)).ToList();
    }
}
