// using Microsoft.AspNetCore.Authentication;
// using Microsoft.AspNetCore.Authentication.Cookies;
// using Microsoft.AspNetCore.Authentication.OAuth;
// using Microsoft.AspNetCore.Authentication.OpenIdConnect;
// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.Extensions.Options;
// using Microsoft.Identity.Web;

// namespace FamilyCookbook.App.Endpoints;

// public static class AuthenticationEndpoints
// {
//     public static void RegisterAuthenticationEndpoints(this WebApplication app)
//     {
//         app.MapGet("/MicrosoftIdentity/Account/SignIn/{scheme?}", async ([FromRoute] string? scheme,
//             [FromQuery] string redirectUri) =>
//         {
//             scheme ??= OpenIdConnectDefaults.AuthenticationScheme;
//             string redirect;
//             if (!string.IsNullOrEmpty(redirectUri) && Url.IsLocalUrl(redirectUri))
//             {
//                 redirect = redirectUri;
//             }
//             else
//             {
//                 redirect = Url.Content("~/")!;
//             }

//             return Challenge(
//                 new AuthenticationProperties { RedirectUri = redirect },
//                 scheme);
//         });
//     }
// }
