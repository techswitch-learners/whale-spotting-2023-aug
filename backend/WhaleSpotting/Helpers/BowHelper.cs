using System.Text;
using Microsoft.AspNetCore.Mvc;
using WhaleSpotting.Models.Api;

namespace WhaleSpotting.Helpers;

public static class BowHelper
{
    public static async Task<string> GetBodyOfWater(double lat, double lon)
    {
        var GeoapifyApiKey = _config["GeoapifyKey"];

        var _client = new HttpClient();
        var response = await _client.GetFromJsonAsync<GeoapifyBodyOfWater>(
            $"https://api.geoapify.com/v1/geocode/reverse?lat={lat}&lon={lon}&apiKey={GeoapifyApiKey}"
        );

        if (response?.Features[0]?.Properties?.Name == null)
        {
            return "awaiting confirmation";
        }
        else
        {
            return response?.Features[0]?.Properties?.Name;
        }
    }
}
