namespace WhaleSpotting.Models.Database;

public class Species
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public List<Post> Posts { get; set; } = null!;
}
