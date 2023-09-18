using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Models.Response;

public class EventResponse
{
    public int Id { get; }
    public string Name { get; }
    public DateTime StartDate { get; }
    public int DurationInHours { get; }
    public string Location { get; }
    public string Link { get; }
    public string ImageUrl { get; }

    public EventResponse(Event @event)
    {
        Id = @event.Id;
        Name = @event.Name;
        StartDate = @event.StartDate;
        DurationInHours = @event.DurationInHours;
        Location = @event.Location;
        Link = @event.Link;
        ImageUrl = @event.ImageUrl;
    }
}
