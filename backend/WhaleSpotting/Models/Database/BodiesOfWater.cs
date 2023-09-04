using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WhaleSpotting.Models.Database
{
    public class BodiesOfWater
    {
        public int Id { get; set; }
        public string? Name { get; set; }

    }
}