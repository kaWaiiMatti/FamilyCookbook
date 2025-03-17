using FamilyCookbook.Backend.Dto;
using FamilyCookbook.Data.Entities;

namespace FamilyCookbook.Backend.Extensions;

public static class RecipeEntityExtensions
{
    public static RecipeDto ToDto(this RecipeEntity entity)
    {
        return new RecipeDto
        {
            Id = entity.Id,
            Name = entity.Name,
        };
    }
}
