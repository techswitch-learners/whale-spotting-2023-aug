namespace WhaleSpotting.Models.Api;

public class GeoapifyBodyOfWater
{
    public List<Feature>? Features { get; set; }
}

public class Feature
{
    public Properties? Properties { get; set; }
}

public class Properties
{
    public string? Name { get; set; }
    public string? Ocean { get; set; }
    public string? Marinearea { get; set; }
}
