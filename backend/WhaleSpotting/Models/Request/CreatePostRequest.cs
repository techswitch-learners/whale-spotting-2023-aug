using System.ComponentModel.DataAnnotations;

namespace WhaleSpotting.Models.Request;

public class CreatePostRequest
{
    public int UserId { get; set; }

    [Range(-90, 90)]
    public double Latitude { get; set; }

    [Range(-180, 180)]
    public double Longitude { get; set; }
    public int? SpeciesId { get; set; }
    public int? WhaleId { get; set; }

    [Url]
    public string ImageUrl { get; set; } = null!;

    [MinLength(5)]
    public string Description { get; set; } = null!;
}
