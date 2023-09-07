using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Enums;
using Microsoft.EntityFrameworkCore;

namespace WhaleSpotting.Repositories;

public interface IBodyOfWaterRepo
{
    public BodyOfWater GetByName(string name);

    public List<BodyOfWater> GetAllWaters();
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
            return _context.BodiesOfWater
                .Include(b => b.Posts)
                .Single(bodyOfWater => bodyOfWater.Name == name);
        }
        catch (InvalidOperationException)
        {
            throw new ArgumentException($"Body of Water with name ${name} not found");
        }
    }

    public List<BodyOfWater> GetAllWaters()
    {
        try
        {
            return _context.BodiesOfWater
                .Include(user => user.Posts)
                .ToList();
        }
        catch (InvalidOperationException)
        {
            throw new ArgumentException($"Users not found");
        }
    }
}
