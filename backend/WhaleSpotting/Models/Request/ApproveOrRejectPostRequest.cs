using WhaleSpotting.Enums;

namespace WhaleSpotting.Models.Request;

public class ApproveOrRejectPostRequest
{
    public ApprovalStatus ApprovalStatus { get; set; }
}
