using WhaleSpotting.Models.Database;
using Microsoft.EntityFrameworkCore;
using WhaleSpotting.Models.Request;

namespace WhaleSpotting.Repositories;

public interface IBodyOfWaterRepo
{
    BodyOfWater GetByName(string name);
    BodyOfWater Create(CreateBodyOfWaterRequest createBodyOfWaterRequest);
    List<BodyOfWater> GetAll();
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

    public List<BodyOfWater> GetAll()
    {
        return _context.BodiesOfWater.Include(user => user.Posts).ToList();
    }

    public BodyOfWater Create(CreateBodyOfWaterRequest createBodyOfWaterRequest)
    {
        var newBodyOfWater = new BodyOfWater
        {
            Name = createBodyOfWaterRequest.Name,
            Posts = new List<Post>(),
        };

        var insertedEntity = _context.BodiesOfWater.Add(newBodyOfWater);
        _context.SaveChanges();

        return insertedEntity.Entity;
    }
}
