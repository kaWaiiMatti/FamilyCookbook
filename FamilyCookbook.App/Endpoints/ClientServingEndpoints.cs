// using Microsoft.AspNetCore.Authentication;
// using Microsoft.AspNetCore.Authentication.Cookies;
// using Microsoft.AspNetCore.Authentication.OAuth;
// using Microsoft.AspNetCore.Authentication.OpenIdConnect;
// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.Extensions.Options;
// using Microsoft.Identity.Web;

namespace FamilyCookbook.App.Endpoints;

public static class AuthenticationEndpoints
{
    public static void RegisterClientServingEndpoints(this WebApplication app)
    {
        app.MapGet("/", () => Results.Redirect("/index.html"));
    }
}
