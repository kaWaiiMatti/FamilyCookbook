using FamilyCookbook.App.Dto;
using FamilyCookbook.App.Extensions;
using FamilyCookbook.Data;
using FamilyCookbook.Data.Entities;

namespace FamilyCookbook.App;

public interface IUnitLogic
{
    Task<UnitDto> AddUnit(NewUnitDto unit);
}

public class UnitLogic : IUnitLogic
{
    public readonly CookbookDataContext _dataContext;

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