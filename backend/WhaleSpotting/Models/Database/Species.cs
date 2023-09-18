namespace WhaleSpotting.Models.Database;

public class Species
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string LatinName { get; set; } = null!;
    public string Description { get; set; } = null!;
    public List<Whale> Whales { get; set; } = null!;
}
