using System.ComponentModel.DataAnnotations;

namespace WhaleSpotting.Models.Request;

public class ModifyPostRequest
{
    [Range(-90, 90)]
    public double Latitude { get; set; }

    [Range(-180, 180)]
    public double Longitude { get; set; }

    public int? SpeciesId { get; set; }

    [Url]
    public string ImageUrl { get; set; } = null!;

    [MinLength(1)]
    public string Description { get; set; } = null!;
}
