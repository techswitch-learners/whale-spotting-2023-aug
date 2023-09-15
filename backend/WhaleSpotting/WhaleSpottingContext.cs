using Microsoft.EntityFrameworkCore;
using WhaleSpotting.Models.Database;

namespace WhaleSpotting;

public class WhaleSpottingContext : DbContext
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Whale> Whales => Set<Whale>();
    public DbSet<Species> Species => Set<Species>();
    public DbSet<Post> Posts => Set<Post>();
    public DbSet<Event> Events => Set<Event>();
    public DbSet<BodyOfWater> BodiesOfWater => Set<BodyOfWater>();
    public DbSet<Interaction> Interactions => Set<Interaction>();

    public WhaleSpottingContext(DbContextOptions<WhaleSpottingContext> options)
        : base(options) { }
}
