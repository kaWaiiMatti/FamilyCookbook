namespace FamilyCookbook.Backend.Endpoints;

public static class RecipeEndpoints
{
    public static void RegisterRecipeEndpoints(this WebApplication app)
    {
        app.MapPost("/api/recipe", () =>
        {
            throw new NotImplementedException();
        });
    }
}
