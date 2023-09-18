using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Models.Response;

public class SpeciesResponse
{
    public class SpeciesWhale
    {
        public int TagNumber { get; }
        public string Name { get; }

        public SpeciesWhale(Whale whale)
        {
            TagNumber = whale.TagNumber;
            Name = whale.Name;
        }
    }

    public int Id { get; }
    public string Name { get; }
    public string LatinName { get; }
    public string Description { get; }
    public List<SpeciesWhale> Whales { get; }

    public SpeciesResponse(Species species)
    {
        Id = species.Id;
        Name = species.Name;
        LatinName = species.LatinName;
        Description = species.Description;
        Whales = species.Whales.Select(whale => new SpeciesWhale(whale)).ToList();
    }
}
