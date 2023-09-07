namespace WhaleSpotting.Models.Request;

public class EventRequest
{
    public int Id { get; set; }
    public DateOnly? StartDate { get; set; }
    public int? Duration { get; set; }
    public string? Location { get; set; }
    public string? EventLink { get; set; }
    public string? EventImageUrl { get; set; }
}
