using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Enums;
using Microsoft.EntityFrameworkCore;

namespace WhaleSpotting.Repositories;

public interface IBodyOfWaterRepo
{
    public BodyOfWater GetByName(string name);
}

public class BodyOfWaterRepo : IBodyOfWaterRepo
{
    private readonly WhaleSpottingContext _context;

    public BodyOfWaterRepo(WhaleSpottingContext context)
    {
        _context = context;
    }

    public BodyOfWater GetByName(string name)
    {
        try
        {
            return _context.BodiesOfWater.Single(bodyOfWater => bodyOfWater.Name == name);
        }
        catch (InvalidOperationException)
        {
            throw new ArgumentException($"Body of Water with name ${name} not found");
        }
    }

    // public List<User> GetAllUsers()
    // {
    //     try
    //     {
    //         return _context.Users
    //             .Include(user => user.Posts)
    //             .Where(user => user.Role == Role.User)
    //             .ToList();
    //     }
    //     catch (InvalidOperationException)
    //     {
    //         throw new ArgumentException($"Users not found");
    //     }
    // }
}
