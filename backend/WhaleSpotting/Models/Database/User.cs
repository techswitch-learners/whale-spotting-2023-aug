using Microsoft.AspNetCore.Identity;

namespace WhaleSpotting.Models.Database;

public class User
{
    public int Id { get; set; }
    public string? Username { get; set; }
    public string? Password
    {
        set
        {
            var hasher = new PasswordHasher<User>();
            HashedPassword = hasher.HashPassword(this, value);
        }
    }
    public string? HashedPassword { get; set; }

    public bool IsCorrectPassword(string password)
    {
        var hasher = new PasswordHasher<User>();
        var result = hasher.VerifyHashedPassword(this, HashedPassword, password);
        return result != PasswordVerificationResult.Failed;
    }
}
