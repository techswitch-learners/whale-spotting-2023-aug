using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Enums;
using Microsoft.EntityFrameworkCore;

namespace WhaleSpotting.Repositories;

public interface IEventRepo
{
    public Event Create(EventRequest newEventRequest);
    Event GetById(int id);
    List<Event> GetAll();
}

public class EventRepo : IEventRepo
{
    private readonly WhaleSpottingContext _context;

    public EventRepo(WhaleSpottingContext context)
    {
        _context = context;
    }

    public Event Create(EventRequest newEventRequest)
    {
        var newEvent = new Event
        {
            StartDate =
                newEventRequest.StartDate
                ?? throw new ArgumentNullException(
                    nameof(newEventRequest),
                    "Property \"StartDate\" must not be null"
                ),
            Duration =
                newEventRequest.Duration
                ?? throw new ArgumentNullException(
                    nameof(newEventRequest),
                    "Property \"Duration\" must not be null"
                ),
            Location =
                newEventRequest.Location
                ?? throw new ArgumentNullException(
                    nameof(newEventRequest),
                    "Property \"Location\" must not be null"
                ),
            EventLink =
                newEventRequest.EventLink
                ?? throw new ArgumentNullException(
                    nameof(newEventRequest),
                    "Property \"EventLink\" must not be null"
                ),
            EventImageUrl =
                newEventRequest.EventLink
                ?? throw new ArgumentNullException(
                    nameof(newEventRequest),
                    "Property \"EventImageUrl\" must not be null"
                )
        };

        var insertedEntity = _context.Events.Add(newEvent);
        _context.SaveChanges();

        return insertedEntity.Entity;
    }

    public Event GetById(int id)
    {
        try
        {
            return _context.Events.Where(item => item.Id == id).Single();
        }
        catch (InvalidOperationException)
        {
            throw new ArgumentException($"Event with id ${id} not found");
        }
    }

    public List<Event> GetAll()
    {
        return _context.Events.ToList();
    }
}
