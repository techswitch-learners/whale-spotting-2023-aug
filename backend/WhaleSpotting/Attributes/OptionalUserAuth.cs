using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using WhaleSpotting.Services;
using WhaleSpotting.Helpers;

namespace WhaleSpotting.Attributes;

public class UserHeaderOptionalFilter : IAuthorizationFilter
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IAuthService _authService;

    public UserHeaderOptionalFilter(
        IHttpContextAccessor httpContextAccessor,
        IAuthService authService
    )
    {
        _httpContextAccessor = httpContextAccessor;
        _authService = authService;
    }

    public void OnAuthorization(AuthorizationFilterContext context)
    {
        if (!_httpContextAccessor.HttpContext!.Request.Headers["Authorization"].Any())
        {
            return;
        }

        var authorization = _httpContextAccessor.HttpContext!.Request.Headers[
            "Authorization"
        ].Single();

        (string Username, string Password) auth;

        try
        {
            auth = AuthHelper.ExtractFromAuthHeader(authorization);
        }
        catch (ArgumentException)
        {
            return;
        }
        var user = _authService.GetMatchingUser(auth.Username, auth.Password);
        if (user == null)
        {
            return;
        }

        _httpContextAccessor.HttpContext.Request.Headers["userId"] = user.Id.ToString();
        _httpContextAccessor.HttpContext.Request.Headers["userRole"] = user.Role.ToString();
    }
}

public class OptionalUserAuthAttribute : TypeFilterAttribute
{
    public OptionalUserAuthAttribute()
        : base(typeof(UserHeaderOptionalFilter)) { }
}
