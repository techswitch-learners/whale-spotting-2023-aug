﻿namespace WhaleSpotting.Models.Request;

public class ModifyPostRequest
{
    public int id { get; set; }
    public DateTime date { get; set; }
    public double lat { get; set; }
    public double lon { get; set; }
    public int species { get; set; }
    public string description { get; set; }
    public string imageUrl { get; set; }
}