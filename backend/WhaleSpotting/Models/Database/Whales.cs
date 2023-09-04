using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WhaleSpotting.Models.Database
{
    public class Whales
    {
        [Key]
        public int TagNumber { get; set; }
        public string? Name { get; set; }

        [ForeignKey("Species")]
        public int SpeciesId { get; set; }
    }
}