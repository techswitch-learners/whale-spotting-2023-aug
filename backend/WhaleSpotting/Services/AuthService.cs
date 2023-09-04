using WhaleSpotting.Repositories;

namespace WhaleSpotting.Services;

public interface IAuthService
{
    public bool IsCorrectUsernameAndPasswordCombination(string username, string password);
}

public class AuthService : IAuthService
{
    private readonly IUserRepo _users;

    public AuthService(IUserRepo users)
    {
        _users = users;
    }

    public bool IsCorrectUsernameAndPasswordCombination(string username, string password)
    {
        try
        {
            var user = _users.GetByUsername(username);
            return user.IsCorrectPassword(password);
        }
        catch (ArgumentException)
        {
            return false;
        }
    }
}
