using WhaleSpotting.Repositories;
using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Services;

public interface IAuthService
{
    User? GetMatchingUser(string username, string password);
}

public class AuthService : IAuthService
{
    private readonly IUserRepo _users;

    public AuthService(IUserRepo users)
    {
        _users = users;
    }

    public User? GetMatchingUser(string username, string password)
    {
        try
        {
            var user = _users.GetByUsername(username);
            if (user.IsCorrectPassword(password))
            {
                return user;
            }
            return null;
        }
        catch (ArgumentException)
        {
            return null;
        }
    }
}
