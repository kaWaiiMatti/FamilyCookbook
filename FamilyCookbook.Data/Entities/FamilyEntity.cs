using System.ComponentModel.DataAnnotations;

namespace FamilyCookbook.Data.Entities;

public class FamilyEntity
{
    public const int MaxNameLength = 50;

    public int Id { get; set; }

    [MaxLength(MaxNameLength)]
    public required string Name { get; set; }
    public ICollection<FamilyMemberEntity> FamilyMembers { get; set; } = default!;
    public ICollection<RecipeEntity> Recipies { get; set; } = default!;
}