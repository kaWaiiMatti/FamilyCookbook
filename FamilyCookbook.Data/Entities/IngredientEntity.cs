using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FamilyCookbook.Data.Entities;

[Table("Ingrediants")]
public class IngredientEntity
{
    public const int MaxSpecifierLength = 50;

    public int Id { get; set; }

    public int UnitId { get; set; }
    public UnitEntity Unit { get; set; } = default!;
    [MaxLength(MaxSpecifierLength)]
    public string? Specifier { get; set; }

    public int RecipeId { get; set; }
    public RecipeEntity Recipe { get; set; } = default!;

    public float Amount { get; set; }
}
