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

        group.MapGet("unit/{id:int}",
            async (CookbookDataContext dataContext, int id) =>
            {
                var unit = await dataContext.Units.FindAsync(id);
                return unit is null ? Results.NotFound() : Results.Ok(unit.ToDto());
            });

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

        group.MapPut("unit/{id:int}",
            async (CookbookDataContext dataContext, int id, UpdateUnitDto update,
                IValidator<UpdateUnitDto> validator) =>
            {
                var validationResult = await validator.ValidateAsync(update);
                if (!validationResult.IsValid)
                {
                    return TypedResults.ValidationProblem(validationResult.ToDictionary());
                }

                var existing = await dataContext.Units.FindAsync(id);
                if (existing is null)
                {
                    return Results.NotFound();
                }

                existing.Abbreviation = update.Abbreviation;
                existing.Name = update.Name;
                await dataContext.SaveChangesAsync();

                return TypedResults.Ok(existing.ToDto());
            });
    }
}
