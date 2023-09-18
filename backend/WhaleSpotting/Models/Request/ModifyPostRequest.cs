namespace WhaleSpotting.Models.Request;

public class ModifyPostRequest
{
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public int? SpeciesId { get; set; }
    public string ImageUrl { get; set; } = null!;
    public string Description { get; set; } = null!;
}
