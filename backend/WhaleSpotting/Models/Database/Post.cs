using WhaleSpotting.Enums;

namespace WhaleSpotting.Models.Database;

public class Post
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User User { get; set; } = null!;
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public DateTime CreationTimestamp { get; set; }
    public int? SpeciesId { get; set; }
    public Species? Species { get; set; }
    public int? WhaleTagNumber { get; set; }
    public Whale? Whale { get; set; }
    public string ImageUrl { get; set; } = null!;
    public string Description { get; set; } = null!;
    public ApprovalStatus ApprovalStatus { get; set; }
    public List<Interaction> Interactions { get; set; } = null!;
    public int? BodyOfWaterId { get; set; }
    public BodyOfWater? BodyOfWater { get; set; }
}
