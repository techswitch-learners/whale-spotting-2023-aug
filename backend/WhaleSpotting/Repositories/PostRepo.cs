using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Enums;
using Microsoft.EntityFrameworkCore;
using WhaleSpotting.Helpers;

namespace WhaleSpotting.Repositories;

public interface IPostRepo
{
    public Post GetById(int id);
    public Post GetByUserId(int id);
    public Post Create(PostRequest newPostRequest);
    public List<Post> GetAll();
}

public class PostRepo : IPostRepo
{
    private readonly WhaleSpottingContext _context;

    public PostRepo(WhaleSpottingContext context)
    {
        _context = context;
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

    public Post Create(PostRequest newPostRequest)
    {
        var user = _context.Users.SingleOrDefault(user => user.Id == newPostRequest.UserId);

        var species = _context.Species.SingleOrDefault(
            species => species.Id == newPostRequest.SpeciesId
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
            Timestamp = DateTime.Now,
            ApprovalStatus = ApprovalStatus.Pending,
            Rating = 0,
        };

        var insertedEntity = _context.Posts.Add(newPost);
        _context.SaveChanges();

        return insertedEntity.Entity;
    }
}
