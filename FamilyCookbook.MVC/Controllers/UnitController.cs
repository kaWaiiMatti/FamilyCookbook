using FamilyCookbook.MVC.Dto;
using FamilyCookbook.MVC.Logic;
using FamilyCookbook.MVC.Models;
using Microsoft.AspNetCore.Mvc;

namespace FamilyCookbook.MVC.Controllers;

public class UnitController : Controller
{
    private readonly IUnitLogic _unitLogic;

    public UnitController(IUnitLogic unitLogic)
    {
        _unitLogic = unitLogic;
    }

    public async Task<IActionResult> Index()
    {
        var viewModel = new UnitViewModel
        {
            Units = await _unitLogic.GetAllUnits()
        };
        return View(viewModel);
    }
    
    [HttpPost]
    public async Task<IActionResult> NewUnit([FromForm] NewUnitDto newUnitDto)
    {
        await _unitLogic.AddUnit(newUnitDto);
        return RedirectToAction("Index");
    }
}
