namespace WhaleSpotting.Models.Request;

public class UserRequest
{
    public string? Username { get; set; }
    public string? Password { get; set; }
    public string? Email { get; set; }
    public string? Name { get; set; }
    public string? ProfileImageUrl { get; set; }
}
