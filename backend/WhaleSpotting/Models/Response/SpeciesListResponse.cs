using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Models.Response;

public class SpeciesListResponse
{
    public List<SpeciesResponse> SpeciesList { get; }

    public SpeciesListResponse(List<Species> speciesList)
    {
        SpeciesList = speciesList.Select(species => new SpeciesResponse(species)).ToList();
    }
}
