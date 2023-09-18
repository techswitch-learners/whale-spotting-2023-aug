using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Enums;
using Microsoft.EntityFrameworkCore;

namespace WhaleSpotting.Repositories;

public interface IUserRepo
{
    User GetById(int id);
    User GetByUsername(string username);
    User Create(CreateUserRequest createUserRequest);
    List<User> GetAll();
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
                .ThenInclude(post => post.Interactions)
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
            .ThenInclude(post => post.Interactions)
            .Where(user => user.Role == Role.User)
            .ToList();
    }

    public User Create(CreateUserRequest createUserRequest)
    {
        if (_context.Users.Any(user => user.Username == createUserRequest.Username))
        {
            throw new ArgumentException(
                $"The username {createUserRequest.Username} is already taken"
            );
        }

        if (_context.Users.Any(user => user.Email == createUserRequest.Email))
        {
            throw new ArgumentException($"The email {createUserRequest.Email} is already taken");
        }

        var newUser = new User
        {
            Username = createUserRequest.Username,
            Email = createUserRequest.Email,
            Name = createUserRequest.Name,
            Role = Role.User,
            CreationTimestamp = DateTime.Now,
            Posts = new List<Post>(),
            Interactions = new List<Interaction>(),
            ProfileImageUrl = createUserRequest.ProfileImageUrl,
            Password = createUserRequest.Password,
        };

        var insertedEntity = _context.Users.Add(newUser);
        _context.SaveChanges();

        return insertedEntity.Entity;
    }
}
