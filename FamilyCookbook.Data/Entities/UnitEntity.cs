using System.ComponentModel.DataAnnotations;

namespace FamilyCookbook.Data.Entities;

public class UnitEntity
{
    public const int MaxAbbreviationLength = 25;
    public const int MaxNameLength = 50;

    public int Id { get; set; }

    [MaxLength(MaxAbbreviationLength)]
    public required string Abbreviation { get; set; }

    [MaxLength(MaxNameLength)]
    public required string Name { get; set; }
}