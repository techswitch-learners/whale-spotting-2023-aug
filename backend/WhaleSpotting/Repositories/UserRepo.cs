using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Enums;
using Microsoft.EntityFrameworkCore;

namespace WhaleSpotting.Repositories;

public interface IUserRepo
{
    public User GetById(int id);
    public User GetByUsername(string username);
    public User Create(UserRequest newUserRequest);
    public List<User> GetAll();
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
            return _context.Users
                .Include(user => user.Posts)
                .ThenInclude(post => post.Likes)
                .Include(user => user.Posts)
                .ThenInclude(post => post.Species)
                .Include(user => user.Posts)
                .ThenInclude(post => post.User)
                .Single(user => user.Id == id);
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
            return _context.Users
                .Include(user => user.Posts)
                .ThenInclude(post => post.Likes)
                .Include(user => user.Posts)
                .ThenInclude(post => post.Species)
                .Include(user => user.Posts)
                .ThenInclude(post => post.User)
                .Single(user => user.Username == username);
        }
        catch (InvalidOperationException)
        {
            throw new ArgumentException($"User with username ${username} not found");
        }
    }

    public List<User> GetAll()
    {
        return _context.Users
            .Include(user => user.Posts)
            .ThenInclude(post => post.Likes)
            .Include(user => user.Posts)
            .ThenInclude(post => post.Species)
            .Include(user => user.Posts)
            .ThenInclude(post => post.User)
            .Where(user => user.Role == Role.User)
            .ToList();
    }

    public User Create(UserRequest newUserRequest)
    {
        if (_context.Users.Any(user => user.Username == newUserRequest.Username))
        {
            throw new ArgumentException($"The username {newUserRequest.Username} is already taken");
        }

        if (_context.Users.Any(user => user.Email == newUserRequest.Email))
        {
            throw new ArgumentException($"The email {newUserRequest.Email} is already taken");
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
            Email =
                newUserRequest.Email
                ?? throw new ArgumentNullException(
                    nameof(newUserRequest),
                    "Property \"Email\" must not be null"
                ),
            Name =
                newUserRequest.Name
                ?? throw new ArgumentNullException(
                    nameof(newUserRequest),
                    "Property \"Name\" must not be null"
                ),
            ProfileImageUrl =
                newUserRequest.ProfileImageUrl
                ?? throw new ArgumentNullException(
                    nameof(newUserRequest),
                    "Property \"ProfileImageUrl\" must not be null"
                ),
            Role = Role.User,
            CreationTimestamp = DateTime.Now,
            Posts = new List<Post>(),
            Rating = 0,
        };

        var insertedEntity = _context.Users.Add(newUser);
        _context.SaveChanges();

        return insertedEntity.Entity;
    }
}
