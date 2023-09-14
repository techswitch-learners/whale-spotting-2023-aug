using WhaleSpotting.Enums;

namespace WhaleSpotting.Models.Request;

public class ApproveOrRejectRequest
{
    public ApprovalStatus ApprovalStatus { get; set; }
}
