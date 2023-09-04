using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WhaleSpotting.Models.Database
{
    public class Events
    {
        public int Id { get; set; }
        public DateTime DateStart { get; set; }
        public DateTime DateEnd { get; set; }
        public string? Location { get; set; }
        public string? EventLink { get; set; }
        public string? EventImageUrl { get; set; }
    }
}