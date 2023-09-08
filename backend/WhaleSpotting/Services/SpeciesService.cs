using WhaleSpotting.Models.Database;
using WhaleSpotting.Repositories;

namespace WhaleSpotting.Services;

public interface ISpeciesService
{
    public List<Species> GetAll();
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
}
