using WhaleSpotting.Models.Api;
using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Repositories;

namespace WhaleSpotting.Services;

public interface IBodyOfWaterService
{
    public BodyOfWater GetByName(string name);

    public List<BodyOfWater> GetAllWaters();
}

public class BodyOfWaterService : IBodyOfWaterService
{
    private readonly IBodyOfWaterRepo _bodiesOfWater;
    private readonly IConfiguration _config;
    private readonly HttpClient _client;

    public BodyOfWaterService(IBodyOfWaterRepo bodyOfWaters, IConfiguration config)
    {
        _bodiesOfWater = bodyOfWaters;
        _config = config;
        _client = new();
    }

    public BodyOfWater GetByName(string name)
    {
        return _bodiesOfWater.GetByName(name);
    }

    public List<BodyOfWater> GetAllWaters()
    {
        return _bodiesOfWater.GetAllWaters();
    }

    public async Task<BodyOfWater> GetByLocation(double lat, double lon)
    {
        var GeoapifyApiKey = _config["GeoapifyKey"];

        var response = await _client.GetFromJsonAsync<GeoapifyBodyOfWater>(
            $"https://api.geoapify.com/v1/geocode/reverse?lat={lat}&lon={lon}&apiKey={GeoapifyApiKey}"
        );

        if (response?.Features?[0].Properties?.Name == null)
        {
            return null;
        }
        else
        {
            return response?.Features[0]?.Properties?.Name;
        }
    }
}
