using WhaleSpotting.Enums;
using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Models.Response;

public class BodyOfWaterResponse
{
    public int Id { get; set; }
    public string Name { get; set; }

    public class BodyofWaterPost
    {
        public int Id { get; set; }
        public string? ImageUrl { get; set; }
        public string? Description { get; set; }
        public DateTime? Timestamp { get; set; }
        public ApprovalStatus? ApprovalStatus { get; set; }
        public int? Rating { get; set; }

        public BodyofWaterPost(Post post)
        {
            Id = post.Id;
            ImageUrl = post.ImageUrl;
            Description = post.Description;
            Timestamp = post.Timestamp;
            ApprovalStatus = post.ApprovalStatus;
            Rating = post.Rating;
        }
    }

    public List<BodyofWaterPost>? Posts { get; set; }

    public BodyOfWaterResponse(BodyOfWater bodyOfWater)
    {
        Id = bodyOfWater.Id;
        Name =
            bodyOfWater.Name
            ?? throw new ArgumentNullException(
                nameof(bodyOfWater),
                "Property \"Name\" must not be null"
            );
        Posts =
            bodyOfWater.Posts != null
                ? bodyOfWater.Posts.Select((post) => new BodyofWaterPost(post)).ToList()
                : throw new ArgumentNullException(
                    nameof(bodyOfWater),
                    "Property \"Posts\" must not be null"
                );
    }
}
