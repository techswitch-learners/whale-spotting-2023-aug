using WhaleSpotting.Enums;
using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Models.Response;

public class SpeciesResponse
{
    public class SpeciesWhale
    {
        public int TagNumber { get; set; }
        public string? Name { get; set; }

        public SpeciesWhale(Whale whale)
        {
            TagNumber = whale.TagNumber;
            Name = whale.Name;
        }
    }

    public int Id { get; set; }
    public string Name { get; set; }
    public string LatinName { get; set; }
    public string Description { get; set; }
    public List<SpeciesWhale> Whales { get; set; }

    public SpeciesResponse(Species species)
    {
        Id = species.Id;
        Name =
            species.Name
            ?? throw new ArgumentNullException(
                nameof(species),
                "Property \"Name\" must not be null"
            );
        LatinName =
            species.LatinName
            ?? throw new ArgumentNullException(
                nameof(species),
                "Property \"LatinName\" must not be null"
            );
        Description =
            species.Description
            ?? throw new ArgumentNullException(
                nameof(species),
                "Property \"Description\" must not be null"
            );
        Whales =
            species.Whales != null
                ? species.Whales.Select(whale => new SpeciesWhale(whale)).ToList()
                : throw new ArgumentNullException(
                    nameof(species),
                    "Property \"Whales\" must not be null"
                );
    }
}
