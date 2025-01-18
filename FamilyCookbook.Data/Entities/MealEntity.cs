using FamilyCookbook.Data.Enums;

namespace FamilyCookbook.Data.Entities;

public class MealEntity
{
    public int Id { get; set; }

    public required int FamilyId { get; set; }
    public FamilyEntity Family { get; set; } = default!;

    public required int RecipeId { get; set; }
    public RecipeEntity Recipe { get; set; } = default!;
    public required MealType Type { get; set; }
    public required MealStatus Status { get; set; }
    public required MealSource Source { get; set; }
    public required MealFreshness Freshness { get; set; }
    public required DateOnly Date { get; set; }
}
