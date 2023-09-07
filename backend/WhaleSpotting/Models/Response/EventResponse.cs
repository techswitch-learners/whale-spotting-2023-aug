using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Models.Response;

public class EventResponse
{
    public int Id { get; set; }

    public EventResponse(Event spottingevent)
    {
        Id = spottingevent.Id;
    }
}
