namespace WhaleSpotting.Models.Api;

public class What3WordsLocation
{
    public What3WordsCoordinates? Coordinates { get; set; }
}

public class What3WordsCoordinates
{
    public double? Lat { get; set; }
    public double? Lng { get; set; }
}
