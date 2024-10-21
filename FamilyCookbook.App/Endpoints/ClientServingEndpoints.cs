namespace FamilyCookbook.App.Endpoints;

public static class AuthenticationEndpoints
{
    public static void RegisterClientServingEndpoints(this WebApplication app)
    {
        app.MapGet("/", () => Results.Redirect("/index.html"));
    }
}
