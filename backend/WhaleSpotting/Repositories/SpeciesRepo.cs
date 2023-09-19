using Microsoft.EntityFrameworkCore;
using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Repositories;

public interface ISpeciesRepo
{
    List<Species> GetAll();
    Species GetByName(string name);
}

public class SpeciesRepo : ISpeciesRepo
{
    private readonly WhaleSpottingContext _context;

    public SpeciesRepo(WhaleSpottingContext context)
    {
        _context = context;
    }

    public List<Species> GetAll()
    {
        return _context.Species.Include(species => species.Whales).ToList();
    }

    public Species GetByName(string name)
    {
        try
        {
            return _context.Species
                .Include(species => species.Posts)
                .ThenInclude(posts => posts.Interactions)
                .Include(species => species.Posts)
                .ThenInclude(posts => posts.User)
                .Include(species => species.Posts)
                .ThenInclude(posts => posts.BodyOfWater)
                .Single(species => species.Name == name);
        }
        catch (InvalidOperationException)
        {
            throw new ArgumentException($"Species with name ${name} not found");
        }
    }
}
