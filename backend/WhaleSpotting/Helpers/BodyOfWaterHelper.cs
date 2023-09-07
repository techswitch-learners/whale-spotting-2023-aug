using System.Text;

namespace WhaleSpotting.Helpers;

public static class BodyOfWaterHelper
{
    private static string? result;
    public static string GetBodyOfWaterName(double lat, double lon)
    {
        var apiKey = Environment.GetEnvironmentVariable("GEO_REVERSE_API_KEY");

        var uri = string.Format("https://api.geoapify.com/v1/geocode/reverse?lat={0}&lon={1}&apiKey={2}",
                                 lat, lon, apiKey);

        GetResponse(uri);

        if (result == null)
        {
            throw new ArgumentException(
                   "Body Of Water Not Found"
               );
        }

        return result;

    }

    private static async void GetResponse(string uri)
    {
        var client = new HttpClient();
        HttpResponseMessage response = await client.GetAsync(uri);
        response.EnsureSuccessStatusCode();
        result = await response.Content.ReadAsStringAsync();
    }
}


