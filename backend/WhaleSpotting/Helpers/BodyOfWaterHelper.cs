using System.Text;

namespace WhaleSpotting.Helpers;

public static class BodyOfWaterHelper
{
    public static async void GetBodyOfWaterName(double lat, double lon)
    {
        var apiKey = Environment.GetEnvironmentVariable("GEO_REVERSE_API_KEY");

        var uri = string.Format("https://api.geoapify.com/v1/geocode/reverse?lat={0}&lon={1}&apiKey={2}",
                                 lat, lon, apiKey);

        var client = new HttpClient();
        HttpResponseMessage response = await client.GetAsync(uri);
        response.EnsureSuccessStatusCode();
        var result = await response.Content.ReadAsStringAsync();

        // if (result == null)
        // {
        //     throw new ArgumentException(
        //            "Body Of Water Not Found"
        //        );
        // }

        Console.WriteLine(result.ToString());

    }

}


