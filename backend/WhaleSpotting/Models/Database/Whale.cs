using System.ComponentModel.DataAnnotations;

namespace WhaleSpotting.Models.Database
{
    public class Whale
    {
        [Key]
        public int TagNumber { get; set; }
        public string? Name { get; set; }
        public Species? Species { get; set; }
        public List<Post>? Posts { get; set; }
    }
}
