using WhaleSpotting.Enums;
using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Models.Response;

public class PostResponse
{
    public int Id { get; set; }
    public User User { get; set; }
    public DateTime Timestamp { get; set; }
    public Species Species { get; set; }
    public string ImageUrl { get; set; }
    public string Description { get; set; }
    public ApprovalStatus ApprovalStatus { get; set; }
    public int Rating { get; set; }
    public BodyOfWater BodyOfWater { get; set; }

    public PostResponse(Post post)
    {
        Console.WriteLine(post.ToString());
        Id = post.Id;
        Timestamp =
            post.Timestamp
            ?? throw new ArgumentNullException(
                nameof(post),
                "Property \"Timestamp\" must not be null"
            );
        // User =
        // post.User
        // ?? throw new ArgumentNullException(
        //     nameof(post),
        //     "Property \"user\" must not be null"
        //     );
        Species =
            post.Species
            ?? throw new ArgumentNullException(
                nameof(post),
                "Property \"species\" must not be null"
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
        // BodyOfWater =
        // post.BodyOfWater
        // ?? throw new ArgumentNullException(
        //     nameof(post),
        //     "Property \"BodyOfWater\" must not be null"
        // );
    }
}
