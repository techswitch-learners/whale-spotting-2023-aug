using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Models.Response;

public class BodyOfWaterResponse
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public class BodyofWaterPost
    {
        public int Id { get; set; }

        public string? ImageUrl { get; set; }

        public string? Description { get; set; }

        public BodyofWaterPost(Post post)
        {
            Id = post.Id;
            ImageUrl = post.ImageUrl;
            Description = post.Description;
        }
    }

    public List<BodyofWaterPost>? Posts { get; set; }

    public BodyOfWaterResponse(BodyOfWater bodyOfWater)
    {
        Id = bodyOfWater.Id;
        Name = bodyOfWater.Name;
        if (bodyOfWater.Posts != null)
        {
            Posts =
                bodyOfWater.Posts.Select(post => new BodyofWaterPost(post)).ToList();

        }
    }
}
