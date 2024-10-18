using System.ComponentModel.DataAnnotations;

namespace FamilyCookbook.Data.Entities;

public class IngrediantEntity
{
    public const int MaxSpecifierLength = 50;

    public int Id { get; set; }

    public int UnitId { get; set; }
    public UnitEntity Unit { get; set; } = default!;
    [MaxLength(MaxSpecifierLength)]
    public string? Specifier { get; set; }

    public int ReciceId { get; set; }
    public RecipeEntity Recipe { get; set; } = default!;

    public float Amount { get; set; }
}