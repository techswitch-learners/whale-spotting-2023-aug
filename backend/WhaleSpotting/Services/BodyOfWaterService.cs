using WhaleSpotting.Models.Api;
using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Repositories;

namespace WhaleSpotting.Services;

public interface IBodyOfWaterService
{
    BodyOfWater GetByName(string name);
    List<BodyOfWater> GetAll();
    BodyOfWater Create(CreateBodyOfWaterRequest createBodyOfWaterRequest);
    Task<BodyOfWater?> GetByLocation(double lat, double lon);
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
        _client = new HttpClient();
    }

    public BodyOfWater GetByName(string name)
    {
        return _bodiesOfWater.GetByName(name);
    }

    public List<BodyOfWater> GetAll()
    {
        return _bodiesOfWater.GetAll();
    }

    public BodyOfWater Create(CreateBodyOfWaterRequest createBodyOfWaterRequest)
    {
        return _bodiesOfWater.Create(createBodyOfWaterRequest);
    }

    public async Task<BodyOfWater?> GetByLocation(double lat, double lon)
    {
        var geoReverseApiKey = _config["GeoReverseApiKey"];
        try
        {
            var response = await _client.GetFromJsonAsync<GeoapifyBodyOfWater>(
                $"https://api.geoapify.com/v1/geocode/reverse?lat={lat}&lon={lon}&apiKey={geoReverseApiKey}"
            );
            var waterName = response?.Features?[0].Properties?.Name;
            if (waterName == null)
            {
                return null;
            }
            try
            {
                return GetByName(waterName);
            }
            catch (ArgumentException)
            {
                return Create(new CreateBodyOfWaterRequest { Name = waterName });
            }
        }
        catch (HttpRequestException)
        {
            return null;
        }
    }
}
