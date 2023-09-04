using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Request;
using InvalidOperationException = System.InvalidOperationException;

namespace WhaleSpotting.Repositories;

public interface IUserRepo
{
    public User GetById(int id);
    public User GetByUsername(string username);
    public User Create(UserRequest newUserRequest);
}

public class UserRepo : IUserRepo
{
    private readonly WhaleSpottingContext _context;

    public UserRepo(WhaleSpottingContext context)
    {
        _context = context;
    }

    public User GetById(int id)
    {
        try
        {
            return _context.Users.Single(user => user.Id == id);
        }
        catch (InvalidOperationException)
        {
            throw new ArgumentException($"User with ID {id} not found");
        }
    }

    public User GetByUsername(string username)
    {
        try
        {
            return _context.Users.Single(user => user.Username == username);
        }
        catch (InvalidOperationException)
        {
            throw new ArgumentException($"User with username ${username} not found");
        }
    }

    public User Create(UserRequest newUserRequest)
    {
        if (_context.Users.Any(user => user.Username == newUserRequest.Username))
        {
            throw new ArgumentException($"The username {newUserRequest.Username} is already taken");
        }

        var newUser = new User
        {
            Username =
                newUserRequest.Username
                ?? throw new ArgumentNullException(
                    nameof(newUserRequest),
                    "Property \"Username\" must not be null"
                ),
            Password =
                newUserRequest.Password
                ?? throw new ArgumentNullException(
                    nameof(newUserRequest),
                    "Property \"Password\" must not be null"
                ),
        };
        var insertedEntity = _context.Users.Add(newUser);
        _context.SaveChanges();

        return insertedEntity.Entity;
    }
}
