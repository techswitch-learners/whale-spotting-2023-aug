using Microsoft.AspNetCore.Mvc;
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
            var spottingevent = _eventService.GetById(id);
            return Ok(new EventResponse(spottingevent));
        }
        catch (ArgumentException)
        {
            return NotFound();
        }
    }

    [HttpGet("all")]
    public IActionResult GetAll()
    {
        try
        {
            var events = _eventService.GetAll();
            return Ok(new EventsListResponse(events));
        }
        catch (ArgumentException)
        {
            return NotFound();
        }
    }

    [HttpPost("")]
    public IActionResult Create([FromBody] EventRequest newEventRequest)
    {
        Console.WriteLine(newEventRequest);
        var newEvent = new EventResponse(_eventService.Create(newEventRequest));
        return CreatedAtAction(nameof(GetById), new { id = newEvent.Id }, newEvent);
    }
}
