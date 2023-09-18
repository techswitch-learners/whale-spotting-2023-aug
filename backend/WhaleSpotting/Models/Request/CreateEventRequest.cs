using System.ComponentModel.DataAnnotations;

namespace WhaleSpotting.Models.Request;

public class CreateEventRequest
{
    [MinLength(1)]
    public string Name { get; set; } = null!;

    [DataType(DataType.DateTime)]
    public DateTime StartDate { get; set; }

    [Range(0, int.MaxValue)]
    public int DurationInHours { get; set; }

    [MinLength(2)]
    public string Location { get; set; } = null!;

    [Url]
    public string Link { get; set; } = null!;

    [Url]
    public string ImageUrl { get; set; } = null!;
}
