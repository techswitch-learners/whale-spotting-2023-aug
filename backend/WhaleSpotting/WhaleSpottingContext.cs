using Microsoft.EntityFrameworkCore;
using WhaleSpotting.Models.Database;

namespace WhaleSpotting;

public class WhaleSpottingContext : DbContext
{
    public DbSet<User> Users => Set<User>();

    public WhaleSpottingContext(DbContextOptions<WhaleSpottingContext> options)
        : base(options) { }
}
