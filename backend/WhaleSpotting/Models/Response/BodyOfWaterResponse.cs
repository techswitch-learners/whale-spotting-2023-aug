using WhaleSpotting.Enums;
using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Models.Response;

public class BodyOfWaterResponse
{
    public int Id { get; }
    public string Name { get; }
    public bool HasPosts { get; }

    public BodyOfWaterResponse(BodyOfWater bodyOfWater)
    {
        Id = bodyOfWater.Id;
        Name = bodyOfWater.Name;
        HasPosts = bodyOfWater.Posts.Any(post => post.ApprovalStatus == ApprovalStatus.Approved);
    }
}
