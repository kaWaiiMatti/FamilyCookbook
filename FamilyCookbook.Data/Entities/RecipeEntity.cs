using System.ComponentModel.DataAnnotations;

namespace FamilyCookbook.Data.Entities;

public class RecipeEntity
{
    public const int MaxNameLength = 100;

    public int Id { get; set; }

    public int FamilyId { get; set; }
    public FamilyEntity Family { get; set; } = default!;

    [MaxLength(MaxNameLength)]
    public required string Name { get; set; }
    public ICollection<IngredientEntity> Ingredients { get; set; } = default!;
}
