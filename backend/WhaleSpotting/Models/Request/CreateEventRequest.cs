namespace WhaleSpotting.Models.Request;

public class CreateEventRequest
{
    public string Name { get; set; } = null!;
    public DateTime StartDate { get; set; }
    public int DurationInHours { get; set; }
    public string Location { get; set; } = null!;
    public string Link { get; set; } = null!;
    public string ImageUrl { get; set; } = null!;
}
