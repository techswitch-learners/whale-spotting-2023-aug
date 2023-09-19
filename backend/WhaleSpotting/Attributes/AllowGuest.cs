using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using WhaleSpotting.Services;
using WhaleSpotting.Helpers;
using WhaleSpotting.Enums;

namespace WhaleSpotting.Attributes;

public class GuestHeaderFilter : IAuthorizationFilter
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IAuthService _authService;

    public GuestHeaderFilter(IHttpContextAccessor httpContextAccessor, IAuthService authService)
    {
        _httpContextAccessor = httpContextAccessor;
        _authService = authService;
    }

    public void OnAuthorization(AuthorizationFilterContext context)
    {
        if (!_httpContextAccessor.HttpContext!.Request.Headers["Authorization"].Any())
        {
            _httpContextAccessor.HttpContext.Request.Headers["userId"] = "-1";
            _httpContextAccessor.HttpContext.Request.Headers["userRole"] = Role.Guest.ToString();
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
            _httpContextAccessor.HttpContext.Request.Headers["userId"] = "-1";
            _httpContextAccessor.HttpContext.Request.Headers["userRole"] = Role.Guest.ToString();
            return;
        }
        var user = _authService.GetMatchingUser(auth.Username, auth.Password);
        if (user == null)
        {
            _httpContextAccessor.HttpContext.Request.Headers["userId"] = "-1";
            _httpContextAccessor.HttpContext.Request.Headers["userRole"] = Role.Guest.ToString();
            return;
        }

        _httpContextAccessor.HttpContext.Request.Headers["userId"] = user.Id.ToString();
        _httpContextAccessor.HttpContext.Request.Headers["userRole"] = user.Role.ToString();

        return;
    }
}

public class AllowGuestAttribute : TypeFilterAttribute
{
    public AllowGuestAttribute()
        : base(typeof(GuestHeaderFilter)) { }
}
