using FamilyCookbook.Backend.Dto;
using FamilyCookbook.Data.Entities;

namespace FamilyCookbook.Backend.Extensions;

public static class UnitEntityExtensions
{
    public static UnitDto ToDto(this UnitEntity entity)
    {
        return new UnitDto
        {
            Abbreviation = entity.Abbreviation,
            Id = entity.Id,
            Name = entity.Name,
        };
    }
}
