using Microsoft.EntityFrameworkCore;
using WhaleSpotting.Models.Database;

namespace WhaleSpotting;

public class WhaleSpottingContext : DbContext
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Species> Species => Set<Species>();
    public DbSet<Post> Posts => Set<Post>();
    public DbSet<Event> Events => Set<Event>();
    public DbSet<BodyOfWater> BodiesOfWater => Set<BodyOfWater>();
    public DbSet<Interaction> Interactions => Set<Interaction>();

    public WhaleSpottingContext(DbContextOptions<WhaleSpottingContext> options)
        : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .Entity<Species>()
            .HasData(
                new Species { Id = -1, Name = "Sperm whale" },
                new Species { Id = -2, Name = "Blue whale" },
                new Species { Id = -3, Name = "Bowhead whale" },
                new Species { Id = -4, Name = "Bryde's whale" },
                new Species { Id = -5, Name = "False killer whale" },
                new Species { Id = -6, Name = "Fin whale" },
                new Species { Id = -7, Name = "Gray whale" },
                new Species { Id = -8, Name = "Humpback whale" },
                new Species { Id = -9, Name = "Killer whale" },
                new Species { Id = -10, Name = "Minke whale" },
                new Species { Id = -11, Name = "Pilot whale" },
                new Species { Id = -12, Name = "Right whale" },
                new Species { Id = -13, Name = "Sei whale" }
            );

        modelBuilder
            .Entity<BodyOfWater>()
            .HasData(
                new BodyOfWater { Id = -1, Name = "South Pacific Ocean" },
                new BodyOfWater { Id = -2, Name = "Indian Ocean" },
                new BodyOfWater { Id = -3, Name = "North Pacific Ocean" },
                new BodyOfWater { Id = -4, Name = "South Atlantic Ocean" },
                new BodyOfWater { Id = -5, Name = "Southern Ocean" },
                new BodyOfWater { Id = -6, Name = "North Atlantic Ocean" },
                new BodyOfWater { Id = -7, Name = "Arctic Ocean" },
                new BodyOfWater { Id = -8, Name = "Ross Sea" },
                new BodyOfWater { Id = -9, Name = "Weddell Sea" },
                new BodyOfWater { Id = -10, Name = "Philippine Sea" },
                new BodyOfWater { Id = -11, Name = "Norwegian Sea" },
                new BodyOfWater { Id = -12, Name = "Barents Sea" },
                new BodyOfWater { Id = -13, Name = "Tasman Sea" },
                new BodyOfWater { Id = -14, Name = "Arabian Sea" },
                new BodyOfWater { Id = -15, Name = "Coral Sea" },
                new BodyOfWater { Id = -16, Name = "Bering Sea" },
                new BodyOfWater { Id = -17, Name = "Sargasso Sea" },
                new BodyOfWater { Id = -18, Name = "Greenland Sea" },
                new BodyOfWater { Id = -19, Name = "South China Sea" },
                new BodyOfWater { Id = -20, Name = "Caribbean Sea" },
                new BodyOfWater { Id = -21, Name = "Kara Sea" },
                new BodyOfWater { Id = -22, Name = "Sea of Okhotsk" },
                new BodyOfWater { Id = -23, Name = "Bay of Bengal" },
                new BodyOfWater { Id = -24, Name = "Scotia Sea" },
                new BodyOfWater { Id = -25, Name = "Gulf of Mexico" },
                new BodyOfWater { Id = -26, Name = "Davis Strait" },
                new BodyOfWater { Id = -27, Name = "Mediterranean Sea" },
                new BodyOfWater { Id = -28, Name = "Baffin Bay" },
                new BodyOfWater { Id = -29, Name = "Mozambique Channel" },
                new BodyOfWater { Id = -30, Name = "Beaufort Sea" },
                new BodyOfWater { Id = -31, Name = "Great Australian Bight" },
                new BodyOfWater { Id = -32, Name = "Labrador Sea" },
                new BodyOfWater { Id = -33, Name = "Bellingshausen Sea" },
                new BodyOfWater { Id = -34, Name = "Drake Passage" },
                new BodyOfWater { Id = -35, Name = "Davis Sea" },
                new BodyOfWater { Id = -36, Name = "North Sea" },
                new BodyOfWater { Id = -37, Name = "Gulf of Guinea" },
                new BodyOfWater { Id = -38, Name = "Andaman Sea" },
                new BodyOfWater { Id = -39, Name = "Sea of Japan" },
                new BodyOfWater { Id = -40, Name = "Arafura Sea" },
                new BodyOfWater { Id = -41, Name = "Solomon Sea" },
                new BodyOfWater { Id = -42, Name = "Laccadive Sea" },
                new BodyOfWater { Id = -43, Name = "East China Sea" },
                new BodyOfWater { Id = -44, Name = "Black Sea" },
                new BodyOfWater { Id = -45, Name = "Laptev Sea" },
                new BodyOfWater { Id = -46, Name = "Prydz Bay" },
                new BodyOfWater { Id = -47, Name = "Gulf of Alaska" },
                new BodyOfWater { Id = -48, Name = "Chukchi Sea" },
                new BodyOfWater { Id = -49, Name = "East Siberian Sea" },
                new BodyOfWater { Id = -50, Name = "Lincoln Sea" },
                new BodyOfWater { Id = -51, Name = "Timor Sea" },
                new BodyOfWater { Id = -52, Name = "Celebes Sea" },
                new BodyOfWater { Id = -53, Name = "Red Sea" },
                new BodyOfWater { Id = -54, Name = "Yellow Sea" },
                new BodyOfWater { Id = -55, Name = "Tyrrhenian Sea" },
                new BodyOfWater { Id = -56, Name = "Caspian Sea" },
                new BodyOfWater { Id = -57, Name = "Gulf of Anadyr" },
                new BodyOfWater { Id = -58, Name = "Denmark Strait" },
                new BodyOfWater { Id = -59, Name = "George VI Sound" },
                new BodyOfWater { Id = -60, Name = "Marguerite Bay" },
                new BodyOfWater { Id = -61, Name = "Geographe Bay" },
                new BodyOfWater { Id = -62, Name = "Gulf of Carpentaria" },
                new BodyOfWater { Id = -63, Name = "Makassar Strait" },
                new BodyOfWater { Id = -64, Name = "Gulf of Tomini" },
                new BodyOfWater { Id = -65, Name = "Molucca Sea" },
                new BodyOfWater { Id = -66, Name = "Buli Bay" },
                new BodyOfWater { Id = -67, Name = "Gulf of Thailand" },
                new BodyOfWater { Id = -68, Name = "Gulf of Aden" },
                new BodyOfWater { Id = -69, Name = "Gulf of Oman" },
                new BodyOfWater { Id = -70, Name = "Alboran Sea" },
                new BodyOfWater { Id = -71, Name = "Balearic Sea" },
                new BodyOfWater { Id = -72, Name = "Gulf of Maine" },
                new BodyOfWater { Id = -73, Name = "Adriatic Sea" },
                new BodyOfWater { Id = -74, Name = "Gulf of St. Lawrence" },
                new BodyOfWater { Id = -75, Name = "Bay of Biscay" },
                new BodyOfWater { Id = -76, Name = "English Channel" },
                new BodyOfWater { Id = -77, Name = "Irish Sea" },
                new BodyOfWater { Id = -78, Name = "Gulf of Bothnia" },
                new BodyOfWater { Id = -79, Name = "Shelikhova Gulf" },
                new BodyOfWater { Id = -80, Name = "Gulf of Yana" },
                new BodyOfWater { Id = -81, Name = "Kane Basin" }
            );
    }
}
