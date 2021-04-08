using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using smartfy.portal_api.domain.Entities;
using smartfy.portal_api.domain.Enums;
using smartfy.portal_api.domain.Extensions;
using smartfy.portal_api.Infra.CrossCutting.Identity.Data;
using smartfy.portal_api.Infra.CrossCutting.Identity.Entities;
using smartfy.portal_api.Infra.CrossCutting.Identity.Entities.AccountViewModels;
using smartfy.portal_api.Infra.CrossCutting.Identity.Extensions;
using smartfy.portal_api.Infra.CrossCutting.Identity.Services;
using smartfy.portal_api.presentation.UI.Web.Extensions;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace smartfy.portal_api.presentation.UI.Web.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IEmailSender _emailSender;
        private readonly ApplicationDbContext _context;

        public AccountController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IEmailSender emailSender, ApplicationDbContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _emailSender = emailSender;
            _context = context;
        }

        [TempData]
        public string ErrorMessage { get; set; }

        [HttpGet]
        [Route("account/login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(string returnUrl = null)
        {
            // Clear the existing external cookie to ensure a clean login process
            await HttpContext.SignOutAsync(IdentityConstants.ExternalScheme);

            //ViewData["ReturnUrl"] = "/Dashboard";
            return View();
        }
              
        [HttpGet]
        [Route("account/register")]
        [AllowAnonymous]
        public IActionResult Register(string returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl;
            return View();
        }

        [HttpPost]
        [Route("account/register")]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register(RegisterViewModel model, string returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl;

            if (ModelState.IsValid)
            {
                var user =
                    new ApplicationUser
                    {
                        UserName = model.Email,
                        Email = model.Email,
                        Enabled = true,
                        CreationDate = DateTime.Now
                    };

                if (model.Password == null)
                {
                    model.Password = "pwc123";
                    ModelState.Remove("Password");
                }

                var result = await _userManager.CreateAsync(user, model.Password);

                if (result.Succeeded)
                {
                    // User claim for write customers data
                    var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    var callbackUrl = Url.EmailConfirmationLink(user.Id, code, Request.Scheme);
                }
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }
    }
}
