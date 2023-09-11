using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Models.Response;

public class EventsListResponse
{
    public List<EventResponse> EventsList { get; set; }

    public EventsListResponse(List<Event> eventsList)
    {
        EventsList = eventsList.Select(item => new EventResponse(item)).ToList();
    }
}
