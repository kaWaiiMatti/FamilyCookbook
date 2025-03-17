using FamilyCookbook.Data.Entities;

namespace FamilyCookbook.Backend.Dto;

public class RecipeDto
{
    public required int Id { get; set; }
    public required string Name { get; set; }
}

public class NewRecipeDto
{
    public required string Name { get; set; }

    public RecipeEntity ToEntity()
    {
        return new RecipeEntity
        {
            FamilyId = 1, // Anne Mattila
            Name = Name
        };
    }
}
