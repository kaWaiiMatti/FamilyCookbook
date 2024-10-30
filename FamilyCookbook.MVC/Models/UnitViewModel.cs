using FamilyCookbook.MVC.Dto;

namespace FamilyCookbook.MVC.Models;

public class UnitViewModel
{
    public required IList<UnitDto> Units { get; set; }
}
