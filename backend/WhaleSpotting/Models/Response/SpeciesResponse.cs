using WhaleSpotting.Enums;
using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Models.Response;

public class SpeciesResponse
{
    public int Id { get; }
    public string Name { get; }
    public bool HasPosts { get; }

    public SpeciesResponse(Species species)
    {
        Id = species.Id;
        Name = species.Name;
        HasPosts = species.Posts.Any(post => post.ApprovalStatus == ApprovalStatus.Approved);
    }
}
