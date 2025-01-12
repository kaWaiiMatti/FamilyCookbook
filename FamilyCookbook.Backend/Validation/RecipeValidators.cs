using FamilyCookbook.Backend.Dto;
using FamilyCookbook.Data.Entities;
using FluentValidation;

namespace FamilyCookbook.Backend.Validation;

public class NewRecipeValidator : AbstractValidator<NewRecipeDto>
{
    public NewRecipeValidator()
    {
        RuleFor(x => x.Name).Length(1, RecipeEntity.MaxNameLength);
    }
}
