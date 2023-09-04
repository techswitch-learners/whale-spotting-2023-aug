using Microsoft.EntityFrameworkCore;
using WhaleSpotting.Models.Database;

namespace WhaleSpotting;

public class WhaleSpottingContext : DbContext
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Whales> Whales => Set<Whales>();
    public DbSet<Species> Species => Set<Species>();
    public DbSet<Posts> Posts => Set<Posts>();
    public DbSet<Events> Events => Set<Events>();
    public DbSet<BodiesOfWater> BodiesOfWater => Set<BodiesOfWater>();




    public WhaleSpottingContext(DbContextOptions<WhaleSpottingContext> options)
        : base(options) { }
}
