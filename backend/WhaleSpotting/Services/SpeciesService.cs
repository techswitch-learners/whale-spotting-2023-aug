using WhaleSpotting.Models.Database;
using WhaleSpotting.Repositories;

namespace WhaleSpotting.Services;

public interface ISpeciesService
{
    public List<Species> GetAllSpecies();
}

public class SpeciesService : ISpeciesService
{
    private readonly ISpeciesRepo _species;

    public SpeciesService(ISpeciesRepo species)
    {
        _species = species;
    }

    public List<Species> GetAllSpecies()
    {
        return _species.GetAllSpecies();
    }
}
