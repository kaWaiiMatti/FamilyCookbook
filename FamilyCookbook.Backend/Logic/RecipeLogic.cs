using FamilyCookbook.Backend.Dto;
using FamilyCookbook.Data;

namespace FamilyCookbook.Backend.Logic;

public interface IRecipeLogic
{
    Task<RecipeDto> CreateNew(NewRecipeDto recipe);
}

public class RecipeLogic : IRecipeLogic
{
    private readonly CookbookDataContext _dataContext;

    public RecipeLogic(CookbookDataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task<RecipeDto> CreateNew(NewRecipeDto recipe)
    {
        var entity = recipe.ToEntity();
        _dataContext.Recipes.Add(entity);
        await _dataContext.SaveChangesAsync();
        return RecipeDto.FromEntity(entity);
    }
}
