using System.ComponentModel.DataAnnotations;

namespace FamilyCookbook.Data.Entities;

public class FamilyMemberEntity
{
    public const int MaxNameLength = 100;
    public const int MaxObjectIdLength = 100;

    public int Id { get; set; }

    [MaxLength(MaxObjectIdLength)]
    public required string ObjectId { get; set; }

    [MaxLength(MaxNameLength)]
    public required string Name { get; set; }

    public int FamilyId { get; set; }
    public FamilyEntity Family { get; set; } = default!;
}