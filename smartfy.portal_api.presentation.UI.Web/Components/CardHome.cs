using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace smartfy.portal_api.presentation.UI.Web.Components
{
    public class CardHome : ViewComponent
    {
        public IViewComponentResult Invoke(string controller, string titulo, string icone, string cor)
        {
            return View("Default", new List<string>() { controller, titulo, icone, cor });
        }
    }
}
