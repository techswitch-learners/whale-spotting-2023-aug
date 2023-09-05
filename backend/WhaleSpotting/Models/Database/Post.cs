using WhaleSpotting.Enums;

namespace WhaleSpotting.Models.Database
{
    public class Post
    {
        public int Id { get; set; }
        public User? User { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public DateTime? Timestamp { get; set; }
        public Species? Species { get; set; }
        public string? ImageUrl { get; set; }
        public string? Description { get; set; }
        public ApprovalStatus? ApprovalStatus { get; set; }
        public Whale? Whale { get; set; }
        public int? Rating { get; set; }
        public BodyOfWater? BodyOfWater { get; set; }
    }
}
