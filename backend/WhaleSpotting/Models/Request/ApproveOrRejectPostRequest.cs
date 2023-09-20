using System.ComponentModel.DataAnnotations;
using WhaleSpotting.Enums;

namespace WhaleSpotting.Models.Request;

public class ApproveOrRejectPostRequest
{
    [EnumDataType(typeof(ApprovalStatus))]
    public ApprovalStatus ApprovalStatus { get; set; }
}
