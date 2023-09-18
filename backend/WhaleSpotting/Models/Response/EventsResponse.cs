using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Models.Response;

public class EventsResponse
{
    public List<EventResponse> Events { get; }

    public EventsResponse(List<Event> events)
    {
        Events = events.Select(item => new EventResponse(item)).ToList();
    }
}
