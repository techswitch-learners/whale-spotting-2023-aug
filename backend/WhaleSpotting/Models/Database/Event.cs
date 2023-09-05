namespace WhaleSpotting.Models.Database
{
    public class Event
    {
        public int Id { get; set; }
        public DateOnly? StartDate { get; set; }
        public int? Duration { get; set; }
        public string? Location { get; set; }
        public string? EventLink { get; set; }
        public string? EventImageUrl { get; set; }
    }
}
