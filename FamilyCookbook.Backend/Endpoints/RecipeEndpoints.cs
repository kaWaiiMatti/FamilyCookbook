using FamilyCookbook.Backend.Dto;
using FamilyCookbook.Backend.Extensions;
using FamilyCookbook.Data;
using FluentValidation;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace FamilyCookbook.Backend.Endpoints;

public static class RecipeEndpoints
{
    public static void RegisterRecipeEndpoints(this RouteGroupBuilder group)
    {
        group.MapGet("recipes", async (CookbookDataContext dataContext) => await dataContext.Recipes.ToListAsync());
        group.MapPost("recipes",
            async Task<Results<Created<RecipeDto>, ValidationProblem>> (CookbookDataContext dataContext,
                NewRecipeDto recipe, IValidator<NewRecipeDto> validator) =>
            {
                var validationResult = await validator.ValidateAsync(recipe);
                if (!validationResult.IsValid)
                {
                    return TypedResults.ValidationProblem(validationResult.ToDictionary());
                }

                var entity = recipe.ToEntity();
                dataContext.Recipes.Add(entity);
                await dataContext.SaveChangesAsync();

                return TypedResults.Created($"/api/recipe/{entity.Id}", entity.ToDto());
            });
    }
}
