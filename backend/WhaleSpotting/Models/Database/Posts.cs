using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WhaleSpotting.Models.Database
{
    public class Posts
    {
        public int Id { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }

        public double Latitude { get; set; }

        public double Longitude { get; set; }

        public DateTime PostDate { get; set; }

        [ForeignKey("Species")]
        public int SpeciesId { get; set; }


        public string? PostImageUrl { get; set; }

        public string? Description { get; set; }

        public bool Approved { get; set; }

        [ForeignKey("Whales")]
        public int TagNumber { get; set; }

        public int Rating { get; set; }

        [ForeignKey("BodiesOfWater")]
        public int BodyOfWaterId { get; set; }


    }
}