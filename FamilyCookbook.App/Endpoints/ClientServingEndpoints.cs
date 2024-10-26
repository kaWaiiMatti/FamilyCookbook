using System.Net.Mime;

namespace FamilyCookbook.App.Endpoints;

public static class AuthenticationEndpoints
{
    private static async Task WriteIndexContent(HttpResponse response)
    {
        response.ContentType = MediaTypeNames.Text.Html;
        var indexContents = await File.ReadAllTextAsync("wwwroot/index.html");
        await response.WriteAsync(indexContents);
    }

    public static void RegisterClientServingEndpoints(this WebApplication app)
    {
        app.MapGet("/", async (HttpResponse response) => { await WriteIndexContent(response); });
    }

    public static void RegisterClientRouteEndpoints(this WebApplication app)
    {
        app.MapGet("/hello", async (HttpResponse response) => { await WriteIndexContent(response); });

        app.MapGet("/events/{*rest}",
            async (string rest, HttpResponse response) => { await WriteIndexContent(response); });
    }
}