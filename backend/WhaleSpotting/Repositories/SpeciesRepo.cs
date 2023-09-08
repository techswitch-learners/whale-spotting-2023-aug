using Microsoft.EntityFrameworkCore;
using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Repositories;

public interface ISpeciesRepo
{
    public List<Species> GetAll();
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
}
