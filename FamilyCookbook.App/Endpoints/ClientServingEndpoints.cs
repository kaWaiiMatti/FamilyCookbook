using System.Net.Mime;

namespace FamilyCookbook.App.Endpoints;

public static class AuthenticationEndpoints
{
    public static void RegisterClientServingEndpoints(this WebApplication app)
    {
        app.MapGet("/", async (HttpResponse response) =>
        {
            response.ContentType = MediaTypeNames.Text.Html;
            var indexContents = await File.ReadAllTextAsync("wwwroot/index.html");
            await response.WriteAsync(indexContents);
        });
    }
}
