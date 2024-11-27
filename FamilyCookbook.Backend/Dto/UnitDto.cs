using FamilyCookbook.Data.Entities;

namespace FamilyCookbook.Backend.Dto;

public class NewUnitDto
{
    public required string Name { get; set; }
    public required string Abbreviation { get; set; }

    public UnitEntity ToEntity()
    {

        return new UnitEntity
        {
            Abbreviation = Abbreviation,
            Name = Name,
        };
    }
}

public class UnitDto : NewUnitDto
{
    public required int Id { get; set; }
}
