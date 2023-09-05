namespace WhaleSpotting.Models.Database
{
    public class BodyOfWater
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public List<Post>? Posts {get; set;}
    }
}