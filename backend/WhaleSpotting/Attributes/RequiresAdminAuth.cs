using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using WhaleSpotting.Services;
using WhaleSpotting.Helpers;
using WhaleSpotting.Enums;

namespace WhaleSpotting.Attributes;

public class AdminHeaderRequirementFilter : IAuthorizationFilter
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IAuthService _authService;

    public AdminHeaderRequirementFilter(
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
            context.Result = new UnauthorizedObjectResult("Missing Authorization header");
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
            context.Result = new UnauthorizedObjectResult("Invalid Authorization header");
            return;
        }
        var user = _authService.GetUser(auth.Username, auth.Password);
        if (user == null)
        {
            context.Result = new UnauthorizedObjectResult("Invalid credentials");
            return;
        }

        if (user.Role != Role.Admin)
        {
            context.Result = new ObjectResult("Must be admin") { StatusCode = 403 };
            return;
        }

        _httpContextAccessor.HttpContext.Request.Headers["UserId"] = user.Id.ToString();
        _httpContextAccessor.HttpContext.Request.Headers["UserRole"] = user.Role.ToString();

        return;
    }
}

public class RequiresAdminAuthAttribute : TypeFilterAttribute
{
    public RequiresAdminAuthAttribute()
        : base(typeof(AdminHeaderRequirementFilter)) { }
}
