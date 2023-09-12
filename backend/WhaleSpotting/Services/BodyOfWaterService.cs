using WhaleSpotting.Models.Api;
using WhaleSpotting.Models.Database;
using WhaleSpotting.Repositories;

namespace WhaleSpotting.Services;

public interface IBodyOfWaterService
{
    public BodyOfWater GetByName(string name);
    public List<BodyOfWater> GetAll();
    public BodyOfWater Create(BodyOfWater newBodyOfWater);
    public Task<BodyOfWater?> GetByLocation(double lat, double lon);
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

    public List<BodyOfWater> GetAll()
    {
        return _bodiesOfWater.GetAll();
    }

    public BodyOfWater Create(BodyOfWater newBodyOfWater)
    {
        return _bodiesOfWater.Create(newBodyOfWater);
    }

    public async Task<BodyOfWater?> GetByLocation(double lat, double lon)
    {
        var GeoReverseApiKey = _config["GeoReverseApiKey"];
        try
        {
            var response = await _client.GetFromJsonAsync<GeoapifyBodyOfWater>(
                $"https://api.geoapify.com/v1/geocode/reverse?lat={lat}&lon={lon}&apiKey={GeoReverseApiKey}"
            );
            var waterName = response?.Features?[0].Properties?.Name;
            if (waterName != null)
            {
                var bodyOfWater = GetByName(waterName);
                if (bodyOfWater != null)
                {
                    return bodyOfWater;
                }
                else
                {
                    return Create(new BodyOfWater() { Name = waterName, Posts = new List<Post>() });
                }
            }
            return null;
        }
        catch (HttpRequestException)
        {
            return null;
        }
    }
}
