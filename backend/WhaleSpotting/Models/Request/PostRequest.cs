namespace WhaleSpotting.Models.Request;

public class PostRequest
{
    public int? UserId { get; set; }
    public double? Latitude { get; set; }
    public double? Longitude { get; set; }
    public int? SpeciesId { get; set; }
    public string? ImageUrl { get; set; }
    public string? Description { get; set; }
    public string? WhaleName { get; set; }
}
