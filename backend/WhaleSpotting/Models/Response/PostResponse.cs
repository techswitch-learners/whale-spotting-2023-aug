using WhaleSpotting.Enums;
using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Models.Response;

public class PostResponse
{
    public class PostUser
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? ProfileImageUrl { get; set; }

        public PostUser(User user)
        {
            Id = user.Id;
            Name = user.Name;
            ProfileImageUrl = user.ProfileImageUrl;
        }
    }

    public class PostBodyOfWater
    {
        public int Id { get; set; }
        public string? Name { get; set; }

        public PostBodyOfWater(BodyOfWater bodyOfWater)
        {
            Id = bodyOfWater.Id;
            Name = bodyOfWater.Name;
        }
    }

    public class PostSpecies
    {
        public int Id { get; set; }
        public string? Name { get; set; }

        public PostSpecies(Species species)
        {
            Id = species.Id;
            Name = species.Name;
        }
    }

    public int Id { get; set; }
    public PostUser User { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public DateTime Timestamp { get; set; }
    public PostSpecies Species { get; set; }
    public string ImageUrl { get; set; }
    public string Description { get; set; }
    public ApprovalStatus ApprovalStatus { get; set; }
    public int Rating { get; set; }
    public PostBodyOfWater? BodyOfWater { get; set; }

    public PostResponse(Post post)
    {
        Id = post.Id;
        Timestamp =
            post.Timestamp
            ?? throw new ArgumentNullException(
                nameof(post),
                "Property \"Timestamp\" must not be null"
            );
        User =
            post.User != null
                ? new PostUser(post.User)
                : throw new ArgumentNullException(
                    nameof(post),
                    "Property \"user\" must not be null"
                );
        Latitude =
            post.Latitude
            ?? throw new ArgumentNullException(
                nameof(post),
                "Property \"Latitude\" must not be null"
            );
        Longitude =
            post.Longitude
            ?? throw new ArgumentNullException(
                nameof(post),
                "Property \"Longitude\" must not be null"
            );
        Species =
            post.Species != null
                ? new PostSpecies(post.Species)
                : throw new ArgumentNullException(
                    nameof(post),
                    "Property \"PostSpecies\" must not be null"
                );
        ImageUrl =
            post.ImageUrl
            ?? throw new ArgumentNullException(
                nameof(post),
                "Property \"ImageUrl\" must not be null"
            );
        Description =
            post.Description
            ?? throw new ArgumentNullException(
                nameof(post),
                "Property \"Description\" must not be null"
            );
        ApprovalStatus =
            post.ApprovalStatus
            ?? throw new ArgumentNullException(
                nameof(post),
                "Property \"ApprovalStatus\" must not be null"
            );
        Rating =
            post.Rating
            ?? throw new ArgumentNullException(
                nameof(post),
                "Property \"Rating\" must not be null"
            );
        BodyOfWater = post.BodyOfWater != null ? new PostBodyOfWater(post.BodyOfWater) : null;
    }
}
