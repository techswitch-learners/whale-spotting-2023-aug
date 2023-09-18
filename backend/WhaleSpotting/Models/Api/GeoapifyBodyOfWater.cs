namespace WhaleSpotting.Models.Api;

public class GeoapifyBodyOfWater
{
    public string? Type { get; set; }
    public List<Feature>? Features { get; set; }
    public Query? Query { get; set; }
}

public class Feature
{
    public string? Type { get; set; }
    public Geometry? Geometry { get; set; }
    public Properties? Properties { get; set; }
    public List<double>? Bbox { get; set; }
}

public class Datasource
{
    public string? Sourcename { get; set; }
    public string? Url { get; set; }
}

public class Geometry
{
    public string? Type { get; set; }
    public List<double>? Coordinates { get; set; }
}

public class Properties
{
    public string? Name { get; set; }
    public string? Marinearea { get; set; }
    public Datasource? Datasource { get; set; }
    public double? Lon { get; set; }
    public double? Lat { get; set; }
    public double? Distance { get; set; }
    public string? Result_type { get; set; }
    public string? Formatted { get; set; }
    public string? Address_line1 { get; set; }
    public string? Address_line2 { get; set; }
    public Timezone? Timezone { get; set; }
    public string? Plus_code { get; set; }
    public Rank? Rank { get; set; }
    public string? Place_id { get; set; }
}

public class Query
{
    public double? Lat { get; set; }
    public double? Lon { get; set; }
    public string? Plus_code { get; set; }
}

public class Rank
{
    public double? Popularity { get; set; }
}

public class Timezone
{
    public string? Name { get; set; }
    public string? Name_alt { get; set; }
    public string? Offset_STD { get; set; }
    public int? Offset_STD_seconds { get; set; }
    public string? Offset_DST { get; set; }
    public int? Offset_DST_seconds { get; set; }
    public string? Abbreviation_STD { get; set; }
    public string? Abbreviation_DST { get; set; }
}
