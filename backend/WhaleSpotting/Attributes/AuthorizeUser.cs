using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using WhaleSpotting.Services;
using WhaleSpotting.Helpers;

namespace WhaleSpotting.Attributes;

public class HeaderRequirementFilter : IAuthorizationFilter
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IAuthService _authService;
    private readonly IUserService _userService;

    public HeaderRequirementFilter(
        IHttpContextAccessor httpContextAccessor,
        IAuthService authService,
        IUserService userService
    )
    {
        _httpContextAccessor = httpContextAccessor;
        _authService = authService;
        _userService = userService;
    }

    public void OnAuthorization(AuthorizationFilterContext context)
    {
        if (!_httpContextAccessor.HttpContext!.Request.Headers["Authorization"].Any())
        {
            context.Result = new UnauthorizedObjectResult(string.Empty);
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
            context.Result = new UnauthorizedObjectResult("Invalid authorization header");
            return;
        }
        if (!_authService.IsCorrectUsernameAndPasswordCombination(auth.Username, auth.Password))
        {
            context.Result = new UnauthorizedObjectResult("Invalid user, pass");

            return;
        }

        // Find userId
        var user = _userService.GetByUsername(auth.Username);

        return;
    }
}

public class AuthorizeUserAttribute : TypeFilterAttribute
{
    public AuthorizeUserAttribute()
        : base(typeof(HeaderRequirementFilter)) { }
}
