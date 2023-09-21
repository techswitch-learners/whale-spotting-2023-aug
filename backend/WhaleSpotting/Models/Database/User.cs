using Microsoft.AspNetCore.Identity;
using WhaleSpotting.Enums;

namespace WhaleSpotting.Models.Database;

public class User
{
    public int Id { get; set; }
    public string Username { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Name { get; set; } = null!;
    public Role Role { get; set; }
    public DateTime CreationTimestamp { get; set; }
    public List<Post> Posts { get; set; } = null!;
    public List<Interaction> Interactions { get; set; } = null!;
    public string ProfileImageUrl { get; set; } = null!;
    public string Password
    {
        set
        {
            var hasher = new PasswordHasher<User>();
            HashedPassword = hasher.HashPassword(this, value);
        }
    }
    public string HashedPassword { get; set; } = null!;

    public bool IsCorrectPassword(string password)
    {
        var hasher = new PasswordHasher<User>();
        var result = hasher.VerifyHashedPassword(this, HashedPassword, password);
        return result != PasswordVerificationResult.Failed;
    }
}
