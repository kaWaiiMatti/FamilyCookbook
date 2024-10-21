using FamilyCookbook.App.Dto;
using Microsoft.AspNetCore.Mvc;

namespace FamilyCookbook.App.Endpoints;

public static class UnitEndpoints
{
    public static void RegisterUnitEndpoints(this WebApplication app)
    {
        app.MapPost("/api/unit", async (NewUnitDto newUnit, [FromServices] IUnitLogic unitLogic) =>
        {
            var unit = await unitLogic.AddUnit(newUnit);
            return TypedResults.Ok(unit);
        });
    }
}
