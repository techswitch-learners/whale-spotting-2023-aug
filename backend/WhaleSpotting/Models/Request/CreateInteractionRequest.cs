using System.ComponentModel.DataAnnotations;

namespace WhaleSpotting.Models.Request;

public class CreateInteractionRequest
{
    [Range(1, int.MaxValue)]
    public int PostId { get; set; }
}
