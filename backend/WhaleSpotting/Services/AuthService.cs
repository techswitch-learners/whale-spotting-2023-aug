using WhaleSpotting.Repositories;
using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Services;

public interface IAuthService
{
    public User? GetMatchingUser(string username, string password);
}

public class AuthService : IAuthService
{
    private readonly IUserRepo _users;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public AuthService(IUserRepo users, IHttpContextAccessor httpContextAccessor)
    {
        _users = users;
        _httpContextAccessor = httpContextAccessor;
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
