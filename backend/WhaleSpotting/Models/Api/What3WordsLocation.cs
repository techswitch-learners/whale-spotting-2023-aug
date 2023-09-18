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

public class What3WordsSquare
{
    public What3WordsCoordinates? SouthWest { get; set; }
    public What3WordsCoordinates? NorthEast { get; set; }
}

public class What3WordsCoordinates
{
    public double? Lat { get; set; }
    public double? Lng { get; set; }
}
