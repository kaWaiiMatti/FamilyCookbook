using FamilyCookbook.Backend.Dto;
using FamilyCookbook.Data.Entities;
using FluentValidation;

namespace FamilyCookbook.Backend.Validation;

public class NewUnitValidator : AbstractValidator<NewUnitDto>
{
    public NewUnitValidator()
    {
        RuleFor(x => x.Abbreviation).Length(1, UnitEntity.MaxAbbreviationLength);
        RuleFor(x => x.Name).Length(1, UnitEntity.MaxNameLength);
    }
}
