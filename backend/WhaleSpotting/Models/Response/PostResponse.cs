using WhaleSpotting.Enums;
using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Models.Response;

public class PostResponse
{
    public class PostUser
    {
        public int Id { get; }
        public string Name { get; }
        public string ProfileImageUrl { get; }

        public PostUser(User user)
        {
            Id = user.Id;
            Name = user.Name;
            ProfileImageUrl = user.ProfileImageUrl;
        }
    }

    public class PostBodyOfWater
    {
        public int Id { get; }
        public string Name { get; }

        public PostBodyOfWater(BodyOfWater bodyOfWater)
        {
            Id = bodyOfWater.Id;
            Name = bodyOfWater.Name;
        }
    }

    public class PostSpecies
    {
        public int Id { get; }
        public string Name { get; }

        public PostSpecies(Species species)
        {
            Id = species.Id;
            Name = species.Name;
        }
    }

    public int Id { get; }
    public PostUser User { get; }
    public double Latitude { get; }
    public double Longitude { get; }
    public DateTime CreationTimestamp { get; }
    public PostSpecies? Species { get; }
    public string ImageUrl { get; }
    public string Description { get; }
    public ApprovalStatus ApprovalStatus { get; }
    public int InteractionCount { get; }
    public bool? HasInteractionFromCurrentUser { get; set; }
    public PostBodyOfWater? BodyOfWater { get; }

    public PostResponse(Post post, int? userId = null)
    {
        Id = post.Id;
        User = new PostUser(post.User);
        Latitude = post.Latitude;
        Longitude = post.Longitude;
        CreationTimestamp = post.CreationTimestamp;
        Species = post.Species != null ? new PostSpecies(post.Species) : null;
        ImageUrl = post.ImageUrl;
        Description = post.Description;
        ApprovalStatus = post.ApprovalStatus;
        InteractionCount = post.Interactions.Count;
        BodyOfWater = post.BodyOfWater != null ? new PostBodyOfWater(post.BodyOfWater) : null;
        HasInteractionFromCurrentUser =
            userId != null && post.Interactions.Any(Interaction => Interaction.UserId == userId);
    }
}
