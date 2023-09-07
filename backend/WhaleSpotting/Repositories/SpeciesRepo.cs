using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Repositories;

public interface ISpeciesRepo
{
    public List<Species> GetAllSpecies();
}

public class SpeciesRepo : ISpeciesRepo
{
    private readonly WhaleSpottingContext _context;

    public SpeciesRepo(WhaleSpottingContext context)
    {
        _context = context;
    }

    public List<Species> GetAllSpecies()
    {
        return _context.Species.ToList();
    }
}
