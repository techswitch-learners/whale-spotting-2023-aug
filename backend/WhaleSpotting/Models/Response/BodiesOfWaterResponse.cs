﻿using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Models.Response;

public class BodiesOfWaterResponse
{
    public List<BodyOfWaterResponse> BodiesOfWater { get; set; }

    public BodiesOfWaterResponse(List<BodyOfWater> bodiesOfWater)
    {
        BodiesOfWater = bodiesOfWater
            .Select(bodyOfWater => new BodyOfWaterResponse(bodyOfWater))
            .ToList();
    }
}
