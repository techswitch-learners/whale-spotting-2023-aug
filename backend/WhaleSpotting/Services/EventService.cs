using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Repositories;

namespace WhaleSpotting.Services;

public interface IEventService
{
    Event Create(CreateEventRequest createEventRequest);
    Event GetById(int id);
    List<Event> GetAll();
}

public class EventService : IEventService
{
    private readonly IEventRepo _events;

    public EventService(IEventRepo events)
    {
        _events = events;
    }

    public Event Create(CreateEventRequest createEventRequest)
    {
        return _events.Create(createEventRequest);
    }

    public Event GetById(int id)
    {
        return _events.GetById(id);
    }

    public List<Event> GetAll()
    {
        return _events.GetAll();
    }
}
