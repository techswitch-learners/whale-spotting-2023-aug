using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Models.Response;

public class BodyOfWatersResponse
{
    public List<BodyOfWaterResponse> BodyOfWaters { get; set; }

    public BodyOfWatersResponse(List<BodyOfWater> bodyOfWaters)
    {
        BodyOfWaters = bodyOfWaters.Select(bodyOfWater => new BodyOfWaterResponse(bodyOfWater)).ToList();
    }
}
