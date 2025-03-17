using FamilyCookbook.Backend.Dto;
using FamilyCookbook.Backend.Extensions;
using FamilyCookbook.Data;
using FluentValidation;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace FamilyCookbook.Backend.Endpoints;

public static class UnitEndpoints
{
    public static void RegisterUnitEndpoints(this RouteGroupBuilder group)
    {
        group.MapGet("units", async (CookbookDataContext dataContext) => await dataContext.Units.ToListAsync());

        group.MapPost("units",
            async Task<Results<Created<UnitDto>, ValidationProblem>> (CookbookDataContext dataContext, NewUnitDto unit,
                IValidator<NewUnitDto> validator) =>
            {
                var validationResult = await validator.ValidateAsync(unit);
                if (!validationResult.IsValid)
                {
                    return TypedResults.ValidationProblem(validationResult.ToDictionary());
                }

                var entity = unit.ToEntity();
                dataContext.Add(entity);
                await dataContext.SaveChangesAsync();

                return TypedResults.Created($"/api/unit/{entity.Id}", entity.ToDto());
            });
    }
}
