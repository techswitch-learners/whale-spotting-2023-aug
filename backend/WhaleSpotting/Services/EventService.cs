using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Repositories;

namespace WhaleSpotting.Services;

public interface IEventService
{
    public Event Create(EventRequest newEventRequest);
    public Event GetById(int id);
}

public class EventService : IEventService
{
    private readonly IEventRepo _events;

    public EventService(IEventRepo events)
    {
        _events = events;
    }

    public Event Create(EventRequest newEventRequest)
    {
        return _events.Create(newEventRequest);
    }

    public Event GetById(int id)
    {
        return _events.GetById(id);
    }
}
