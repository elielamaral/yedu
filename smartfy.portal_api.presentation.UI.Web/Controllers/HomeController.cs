using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using smartfy.portal_api.Infra.CrossCutting.Identity.Data;

namespace smartfy.portal_api.presentation.UI.Web.Controllers
{
    [Authorize]
    public class HomeController : BaseController
    {
        private readonly ApplicationDbContext _db;

        public HomeController(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

    }
}
