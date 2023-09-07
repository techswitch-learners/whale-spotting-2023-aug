namespace WhaleSpotting.Models.Api;

public class What3WordsLocation
{
    public string? Country { get; set; }
    public What3WordsSquare? Square { get; set; }
    public string? NearestPlace { get; set; }
    public What3WordsCoordinates? Coordinates { get; set; }
    public string? Words { get; set; }
    public string? Language { get; set; }
    public string? Map { get; set; }
}
