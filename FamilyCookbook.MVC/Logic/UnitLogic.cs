using FamilyCookbook.MVC.Dto;
using FamilyCookbook.MVC.Extensions;
using FamilyCookbook.Data;

namespace FamilyCookbook.MVC.Logic;

public interface IUnitLogic
{
    Task<UnitDto> AddUnit(NewUnitDto unit);
}

public class UnitLogic : IUnitLogic
{
    private readonly CookbookDataContext _dataContext;

    public UnitLogic(CookbookDataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task<UnitDto> AddUnit(NewUnitDto unit)
    {
        var entity = unit.ToEntity();
        _dataContext.Add(entity);
        await _dataContext.SaveChangesAsync();
        return entity.ToDto();
    }
}
