using WhaleSpotting.Enums;
using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Models.Response;

public class BodyOfWaterResponse
{
    public class BodyOfWaterPost
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
        public DateTime CreationTimestamp { get; set; }
        public ApprovalStatus ApprovalStatus { get; set; }
        public int InteractionCount { get; set; }

        public BodyOfWaterPost(Post post)
        {
            Id = post.Id;
            ImageUrl = post.ImageUrl;
            Description = post.Description;
            CreationTimestamp = post.CreationTimestamp;
            ApprovalStatus = post.ApprovalStatus;
            InteractionCount = post.Interactions.Count;
        }
    }

    public int Id { get; }
    public string Name { get; }
    public List<BodyOfWaterPost> Posts { get; }

    public BodyOfWaterResponse(BodyOfWater bodyOfWater)
    {
        Id = bodyOfWater.Id;
        Name = bodyOfWater.Name;
        Posts = bodyOfWater.Posts.Select(post => new BodyOfWaterPost(post)).ToList();
    }
}
