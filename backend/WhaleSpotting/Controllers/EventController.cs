using Microsoft.AspNetCore.Mvc;
using WhaleSpotting.Attributes;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Models.Response;
using WhaleSpotting.Services;

namespace WhaleSpotting.Controllers;

[ApiController]
[Route("[controller]")]
public class EventController : ControllerBase
{
    private readonly IEventService _eventService;

    public EventController(IEventService eventService)
    {
        _eventService = eventService;
    }

    [HttpGet("{id:int}")]
    public IActionResult GetById([FromRoute] int id)
    {
        try
        {
            var @event = _eventService.GetById(id);
            return Ok(new EventResponse(@event));
        }
        catch (ArgumentException)
        {
            return NotFound();
        }
    }

    [HttpGet("all")]
    public IActionResult GetAll()
    {
        var events = _eventService.GetAll();
        return Ok(new EventsResponse(events));
    }

    [HttpPost("")]
    [RequiresAdminAuth]
    public IActionResult Create([FromBody] CreateEventRequest createEventRequest)
    {
        var newEvent = new EventResponse(_eventService.Create(createEventRequest));
        return CreatedAtAction(nameof(GetById), new { id = newEvent.Id }, newEvent);
    }

    [HttpGet("latest")]
    public IActionResult GetLatest()
    {
        var events = _eventService.GetLatest();
        return Ok(new EventsResponse(events));
    }
}
