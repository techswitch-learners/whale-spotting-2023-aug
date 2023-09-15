using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Enums;
using Microsoft.EntityFrameworkCore;
using WhaleSpotting.Services;

namespace WhaleSpotting.Repositories;

public interface IPostRepo
{
    public Post GetById(int id);
    public List<Post> GetByUserId(int userId);
    public Task<Post> Create(PostRequest newPostRequest);
    public List<Post> GetAll();
    public List<Post> GetPending();
    public void ApproveOrReject(int id, ApprovalStatus approvalStatus);
    public void Modify(int id, ModifyPostRequest modifyPostRequest);
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
                .Include(post => post.Likes)
                .Where(post => post.Id == id)
                .Single();
        }
        catch (InvalidOperationException)
        {
            throw new ArgumentException($"Post with ID {id} not found");
        }
    }

    public List<Post> GetByUserId(int userId)
    {
        try
        {
            return _context.Posts
                .Include(post => post.User)
                .Include(post => post.Species)
                .Include(post => post.Likes)
                .Include(post => post.BodyOfWater)
                .Where(
                    post =>
                        post.ApprovalStatus == ApprovalStatus.Approved
                        && post.User != null
                        && post.User.Id == userId
                )
                .ToList();
        }
        catch (InvalidOperationException)
        {
            throw new ArgumentException($"Posts with user id ${userId} not found");
        }
    }

    public List<Post> GetAll()
    {
        return _context.Posts
            .Include(post => post.User)
            .Include(post => post.Species)
            .Include(post => post.Likes)
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
            Likes = new List<Interaction>(),
        };

        var insertedEntity = _context.Posts.Add(newPost);
        _context.SaveChanges();

        return insertedEntity.Entity;
    }

    public void ApproveOrReject(int id, ApprovalStatus approvalStatus)
    {
        var post = GetById(id);
        post.ApprovalStatus = approvalStatus;
        _context.SaveChanges();
    }

    public void Modify(int id, ModifyPostRequest modifyPostRequest)
    {
        var post = GetById(id);
        post.Latitude = modifyPostRequest.Lat;
        post.Longitude = modifyPostRequest.Lon;
        post.Timestamp = modifyPostRequest.Date;
        var species = _context.Species.SingleOrDefault(
            species => species.Id == modifyPostRequest.SpeciesId
        );
        post.Species = species;
        post.ImageUrl = modifyPostRequest.ImageUrl;
        post.Description = modifyPostRequest.Description;
        _context.SaveChanges();
    }
}
