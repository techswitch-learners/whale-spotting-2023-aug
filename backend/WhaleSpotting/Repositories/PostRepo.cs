using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Enums;
using Microsoft.EntityFrameworkCore;
using WhaleSpotting.Services;

namespace WhaleSpotting.Repositories;

public interface IPostRepo
{
    public Post GetById(int id);
    public Post GetByUserId(int id);
    public Task<Post> Create(PostRequest newPostRequest);
    public List<Post> GetAll();
    public List<Post> GetPending();
    public void ApproveReject(Post post, ApprovalStatus approvalStatus);
    public void Modify(Post post, ModifyPostRequest modifyPostRequest);
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
                .Where(post => post.Id == id)
                .Single();
        }
        catch (InvalidOperationException)
        {
            throw new ArgumentException($"Post with ID {id} not found");
        }
    }

    public Post GetByUserId(int userId)
    {
        try
        {
            return _context.Posts
                .Include(post => post.User)
                .Where(post => post.User != null && post.User.Id == userId)
                .Single();
        }
        catch (InvalidOperationException)
        {
            throw new ArgumentException($"Post with userid ${userId} not found");
        }
    }

    public List<Post> GetAll()
    {
        return _context.Posts
            .Include(post => post.User)
            .Include(post => post.Species)
            .Include(post => post.BodyOfWater)
            .Where(post => post.ApprovalStatus == ApprovalStatus.Approved)
            .ToList();
    }

    public List<Post> GetPending()
    {
        return _context.Posts
            .Include(post => post.User)
            .Include(post => post.Species)
            .Include(post => post.BodyOfWater)
            .Where(post => post.ApprovalStatus == ApprovalStatus.Pending)
            .ToList();
    }

    public async Task<Post> Create(PostRequest newPostRequest)
    {
        var user = _context.Users.SingleOrDefault(user => user.Id == newPostRequest.UserId);

        var species = _context.Species.SingleOrDefault(
            species => species.Id == newPostRequest.SpeciesId
        );

        var bodyOfWater = _bodyOfWaterService.GetByLocation(
            newPostRequest.Latitude
                ?? throw new ArgumentNullException(
                    nameof(newPostRequest),
                    "Property \"Latitude\" must not be null"
                ),
            newPostRequest.Longitude
                ?? throw new ArgumentNullException(
                    nameof(newPostRequest),
                    "Property \"Longitude\" must not be null"
                )
        );

        var newPost = new Post
        {
            User =
                user
                ?? throw new ArgumentNullException(
                    nameof(newPostRequest),
                    "Property \"User\" must not be null"
                ),
            Latitude =
                newPostRequest.Latitude
                ?? throw new ArgumentNullException(
                    nameof(newPostRequest),
                    "Property \"Latitude\" must not be null"
                ),
            Longitude =
                newPostRequest.Longitude
                ?? throw new ArgumentNullException(
                    nameof(newPostRequest),
                    "Property \"Longitude\" must not be null"
                ),
            Species =
                species
                ?? throw new ArgumentNullException(
                    nameof(newPostRequest),
                    "Property \"Species\" must not be null"
                ),
            ImageUrl =
                newPostRequest.ImageUrl
                ?? throw new ArgumentNullException(
                    nameof(newPostRequest),
                    "Property \"ImageUrl\" must not be null"
                ),
            Description =
                newPostRequest.Description
                ?? throw new ArgumentNullException(
                    nameof(newPostRequest),
                    "Property \"Description\" must not be null"
                ),
            BodyOfWater = await bodyOfWater,
            Timestamp = DateTime.Now,
            ApprovalStatus = ApprovalStatus.Pending,
            Rating = 0,
        };

        var insertedEntity = _context.Posts.Add(newPost);
        _context.SaveChanges();

        return insertedEntity.Entity;
    }

    public void ApproveReject(Post post, ApprovalStatus approvalStatus)
    {
        _context.Entry(post).Property("ApprovalStatus").CurrentValue = approvalStatus;
        _context.Entry(post).Property("ApprovalStatus").IsModified = true;
        _context.SaveChanges();
    }

    public void Modify(Post post, ModifyPostRequest modifyPostRequest)
    {
        _context.Entry(post).Property("Latitude").CurrentValue = modifyPostRequest.lat;
        _context.Entry(post).Property("Longitude").CurrentValue = modifyPostRequest.lon;
        _context.Entry(post).Property("Timestamp").CurrentValue = modifyPostRequest.date;
        var species = _context.Species.SingleOrDefault(
            species => species.Id == modifyPostRequest.species
        );
        _context.Entry(post).Reference("Species").CurrentValue = species;
        _context.Entry(post).Property("ImageUrl").CurrentValue = modifyPostRequest.imageUrl;
        _context.Entry(post).Property("Description").CurrentValue = modifyPostRequest.description;
        _context.SaveChanges();
    }
}
