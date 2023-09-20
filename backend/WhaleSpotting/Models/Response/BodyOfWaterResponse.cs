﻿using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Models.Response;

public class BodyOfWaterResponse
{
    public int Id { get; }
    public string Name { get; }
    public List<PostResponse> Posts { get; }

    public BodyOfWaterResponse(BodyOfWater bodyOfWater, int? userId = null)
    {
        Id = bodyOfWater.Id;
        Name = bodyOfWater.Name;
        Posts = bodyOfWater.Posts.Select(post => new PostResponse(post, userId)).ToList();
    }
}
