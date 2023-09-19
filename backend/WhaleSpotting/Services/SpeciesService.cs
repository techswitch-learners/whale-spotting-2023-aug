using WhaleSpotting.Models.Database;
using WhaleSpotting.Repositories;

namespace WhaleSpotting.Services;

public interface ISpeciesService
{
    List<Species> GetAll();
    Species GetByName(string name);
}

public class SpeciesService : ISpeciesService
{
    private readonly ISpeciesRepo _species;

    public SpeciesService(ISpeciesRepo species)
    {
        _species = species;
    }

    public List<Species> GetAll()
    {
        return _species.GetAll();
    }

    public Species GetByName(string name)
    {
        return _species.GetByName(name);
    }
}
