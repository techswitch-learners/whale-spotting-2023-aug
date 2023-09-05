namespace WhaleSpotting.Models.Database
{
    public class Species
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? LatinName { get; set; }
        public string? Description { get; set; }
        public List<Whale>? Whales {get; set;}
    }
}