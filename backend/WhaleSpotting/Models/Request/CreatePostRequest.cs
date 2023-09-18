namespace WhaleSpotting.Models.Request;

public class CreatePostRequest
{
    public int UserId { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public int? SpeciesId { get; set; }
    public int? WhaleId { get; set; }
    public string ImageUrl { get; set; } = null!;
    public string Description { get; set; } = null!;
}
