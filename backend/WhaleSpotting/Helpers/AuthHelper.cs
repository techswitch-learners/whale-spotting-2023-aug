using System.Text;

namespace WhaleSpotting.Helpers;

public class AuthHelper
{
    public static (string Username, string Password) ExtractFromAuthHeader(string authHeader)
    {
        if (!authHeader.StartsWith("Basic "))
        {
            throw new ArgumentException("Authorization header is not in basic format");
        }

        var encodedUsernameAndPassword = authHeader["Basic ".Length..];

        string usernameAndPassword;
        try
        {
            usernameAndPassword = Encoding.UTF8.GetString(
                Convert.FromBase64String(encodedUsernameAndPassword)
            );
        }
        catch (FormatException)
        {
            throw new ArgumentException(
                "Username and password fragment not correctly encoded in base 64"
            );
        }

        var splitUsernameAndPassword = usernameAndPassword.Split(':', 2);
        if (splitUsernameAndPassword.Length < 2)
        {
            throw new ArgumentException("Username and password fragment not separated by a colon");
        }

        return (Username: splitUsernameAndPassword[0], Password: splitUsernameAndPassword[1]);
    }
}
