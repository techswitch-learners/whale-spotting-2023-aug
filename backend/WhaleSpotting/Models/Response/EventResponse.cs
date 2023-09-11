using WhaleSpotting.Enums;
using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Models.Response;

public class EventResponse
{
    public int Id { get; set; }
    public DateTime? StartDate { get; set; }
    public int? Duration { get; set; }
    public string? Location { get; set; }
    public string? EventLink { get; set; }
    public string? EventImageUrl { get; set; }

    public EventResponse(Event spottingEvent)
    {
        Id = spottingEvent.Id;
        StartDate =
            spottingEvent.StartDate
            ?? throw new ArgumentNullException(
                nameof(spottingEvent),
                "Property \"StartDate\" must not be null"
            );
        Duration =
            spottingEvent.Duration
            ?? throw new ArgumentNullException(
                nameof(spottingEvent),
                "Property \"Duration\" must not be null"
            );
        Location =
            spottingEvent.Location
            ?? throw new ArgumentNullException(
                nameof(spottingEvent),
                "Property \"Location\" must not be null"
            );
        EventLink =
            spottingEvent.EventLink
            ?? throw new ArgumentNullException(
                nameof(spottingEvent),
                "Property \"EventLink\" must not be null"
            );
        EventImageUrl =
            spottingEvent.EventImageUrl
            ?? throw new ArgumentNullException(
                nameof(spottingEvent),
                "Property \"EventImageUrl\" must not be null"
            );
    }
}
