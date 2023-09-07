using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Repositories;

namespace WhaleSpotting.Services;

public interface IBodyOfWaterService
{
    public BodyOfWater GetByName(string name);
}

public class BodyOfWaterService : IBodyOfWaterService
{
    private readonly IBodyOfWaterRepo _bodyOfWaters;

    public BodyOfWaterService(IBodyOfWaterRepo bodyOfWaters)
    {
        _bodyOfWaters = bodyOfWaters;
    }

    public BodyOfWater GetByName(string name)
    {
        return _bodyOfWaters.GetByName(name);
    }
}
