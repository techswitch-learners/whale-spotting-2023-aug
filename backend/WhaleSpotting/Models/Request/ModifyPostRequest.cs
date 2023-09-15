namespace WhaleSpotting.Models.Request;

public class ModifyPostRequest
{
    public DateTime Date { get; set; }
    public double Lat { get; set; }
    public double Lon { get; set; }
    public int SpeciesId { get; set; }
    public string Description { get; set; }
    public string ImageUrl { get; set; }
}
