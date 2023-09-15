namespace WhaleSpotting.Models.Request;

public class EventRequest
{
    public DateTime? StartDate { get; set; }
    public int? Duration { get; set; }
    public string? Location { get; set; }
    public string? EventLink { get; set; }
    public string? EventImageUrl { get; set; }
}
