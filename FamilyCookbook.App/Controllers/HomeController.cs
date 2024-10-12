using Microsoft.AspNetCore.Mvc;

namespace FamilyCookbook.Controllers;

public class HomeController : ControllerBase
{
    public HomeController() { }

    [HttpGet]
    public ActionResult Hello()
    {
        return Ok("{\"hello\":\"world\"}");
    }
}