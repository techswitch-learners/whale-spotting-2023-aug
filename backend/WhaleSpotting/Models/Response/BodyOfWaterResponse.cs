using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Models.Response;

public class BodyOfWaterResponse
{
    public class BodyOfWaterPost
    {
        public int Id { get; }
        public string ImageUrl { get; }
        public string Description { get; }

        public BodyOfWaterPost(Post post)
        {
            Id = post.Id;
            ImageUrl = post.ImageUrl;
            Description = post.Description;
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
