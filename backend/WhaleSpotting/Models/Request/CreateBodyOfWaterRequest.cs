using System.ComponentModel.DataAnnotations;

namespace WhaleSpotting.Models.Request;

public class CreateBodyOfWaterRequest
{
    [MinLength(3)]
    public string Name { get; set; } = null!;
}
