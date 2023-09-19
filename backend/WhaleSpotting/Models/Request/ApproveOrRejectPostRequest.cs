using System.ComponentModel.DataAnnotations;
using WhaleSpotting.Enums;

namespace WhaleSpotting.Models.Request;

public class ApproveOrRejectPostRequest
{
    [Range(0, 2)]
    public ApprovalStatus ApprovalStatus { get; set; }
}
