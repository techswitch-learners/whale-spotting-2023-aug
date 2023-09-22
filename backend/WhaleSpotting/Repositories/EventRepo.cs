using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Request;

namespace WhaleSpotting.Repositories;

public interface IEventRepo
{
    Event Create(CreateEventRequest createEventRequest);
    Event GetById(int id);
    List<Event> GetAll();
    List<Event> GetLatest();
}

public class EventRepo : IEventRepo
{
    private readonly WhaleSpottingContext _context;

    public EventRepo(WhaleSpottingContext context)
    {
        _context = context;
    }

    public Event Create(CreateEventRequest createEventRequest)
    {
        var newEvent = new Event
        {
            Name = createEventRequest.Name,
            StartDate = createEventRequest.StartDate,
            DurationInHours = createEventRequest.DurationInHours,
            Location = createEventRequest.Location,
            Link = createEventRequest.Link,
            ImageUrl = createEventRequest.ImageUrl,
        };

        var insertedEntity = _context.Events.Add(newEvent);
        _context.SaveChanges();

        return insertedEntity.Entity;
    }

    public Event GetById(int id)
    {
        try
        {
            return _context.Events.Single(item => item.Id == id);
        }
        catch (InvalidOperationException)
        {
            throw new ArgumentException($"Event with id ${id} not found");
        }
    }

    public List<Event> GetAll()
    {
        return _context.Events.OrderBy(e => e.StartDate).ToList();
    }

    public List<Event> GetLatest()
    {
        return _context.Events
            .Where(e => e.StartDate >= DateTime.Today)
            .OrderBy(e => e.StartDate)
            .Take(10)
            .ToList();
    }
}
