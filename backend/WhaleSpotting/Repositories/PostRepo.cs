using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Enums;
using Microsoft.EntityFrameworkCore;
using WhaleSpotting.Services;

namespace WhaleSpotting.Repositories;

public interface IPostRepo
{
    Post GetById(int id);
    Task<Post> Create(CreatePostRequest createPostRequest, int userId);
    List<Post> GetPending();
    void ApproveOrReject(int id, ApprovalStatus approvalStatus);
    List<Post> Search(SearchPostsRequest searchPostsRequest);
    void Modify(int id, ModifyPostRequest modifyPostRequest, int userId, Role userRole);
}

public class PostRepo : IPostRepo
{
    private readonly WhaleSpottingContext _context;
    private readonly IBodyOfWaterService _bodyOfWaterService;

    public PostRepo(WhaleSpottingContext context, IBodyOfWaterService bodyOfWaterService)
    {
        _context = context;
        _bodyOfWaterService = bodyOfWaterService;
    }

    public Post GetById(int id)
    {
        try
        {
            return _context.Posts
                .Include(post => post.User)
                .Include(post => post.BodyOfWater)
                .Include(post => post.Species)
                .Include(post => post.Interactions)
                .Single(post => post.Id == id);
        }
        catch (InvalidOperationException)
        {
            throw new ArgumentException($"Post with ID {id} not found");
        }
    }

    public List<Post> GetPending()
    {
        return _context.Posts
            .Include(post => post.User)
            .Include(post => post.Species)
            .Include(post => post.Interactions)
            .Include(post => post.BodyOfWater)
            .Where(post => post.ApprovalStatus == ApprovalStatus.Pending)
            .ToList();
    }

    public async Task<Post> Create(CreatePostRequest createPostRequest, int userId)
    {
        var user = _context.Users.SingleOrDefault(user => user.Id == userId);
        if (user == null)
        {
            throw new ArgumentException($"User with id {userId} doesn't exist");
        }

        var species =
            createPostRequest.SpeciesId != null
                ? _context.Species.SingleOrDefault(
                    species => species.Id == createPostRequest.SpeciesId
                )
                : null;

        var whale =
            createPostRequest.WhaleId != null
                ? _context.Whales.SingleOrDefault(
                    whale => whale.TagNumber == createPostRequest.WhaleId
                )
                : null;

        var bodyOfWater = await _bodyOfWaterService.GetByLocation(
            createPostRequest.Latitude,
            createPostRequest.Longitude
        );

        var newPost = new Post
        {
            User = user,
            Latitude = createPostRequest.Latitude,
            Longitude = createPostRequest.Longitude,
            Species = species,
            Whale = whale,
            ImageUrl = createPostRequest.ImageUrl,
            Description = createPostRequest.Description,
            BodyOfWater = bodyOfWater,
            CreationTimestamp = DateTime.Now,
            ApprovalStatus = ApprovalStatus.Pending,
            Interactions = new List<Interaction>(),
        };

        var insertedEntity = _context.Posts.Add(newPost);
        await _context.SaveChangesAsync();

        return insertedEntity.Entity;
    }

    public void ApproveOrReject(int id, ApprovalStatus approvalStatus)
    {
        var post = GetById(id);
        post.ApprovalStatus = approvalStatus;
        _context.SaveChanges();
    }

    public void Modify(int id, ModifyPostRequest modifyPostRequest, int userId, Role userRole)
    {
        var post = GetById(id);

        if (userRole.Equals(Role.Admin) || post.User.Id == userId)
        {
            post.Latitude = modifyPostRequest.Latitude;
            post.Longitude = modifyPostRequest.Longitude;
            var species = _context.Species.SingleOrDefault(
                species => species.Id == modifyPostRequest.SpeciesId
            );
            post.Species = species;
            post.ImageUrl = modifyPostRequest.ImageUrl;
            post.Description = modifyPostRequest.Description;
            _context.SaveChanges();
        }
        else
        {
            throw new UnauthorizedAccessException();
        }
    }

    public List<Post> Search(SearchPostsRequest searchPostsRequest)
    {
        var query = _context.Posts
            .Include(post => post.User)
            .Include(post => post.BodyOfWater)
            .Include(post => post.Species)
            .Include(post => post.Interactions)
            .Where(post => post.ApprovalStatus == ApprovalStatus.Approved);
        if (!string.IsNullOrWhiteSpace(searchPostsRequest.BodyOfWaterName))
        {
            query = query.Where(
                post =>
                    post.BodyOfWater != null
                    && post.BodyOfWater.Name == searchPostsRequest.BodyOfWaterName
            );
        }
        if (!string.IsNullOrWhiteSpace(searchPostsRequest.SpeciesName))
        {
            query = query.Where(
                post => post.Species != null && post.Species.Name == searchPostsRequest.SpeciesName
            );
        }
        return query.ToList();
    }
}
