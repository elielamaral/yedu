using Microsoft.AspNetCore.Mvc;
using smartfy.portal_api.Infra.CrossCutting.Identity.Data;
using smartfy.portal_api.Infra.CrossCutting.Identity.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using smartfy.portal_api.Infra.CrossCutting.Identity.Entities;

namespace smartfy.portal_api.presentation.UI.Web.Controllers.Api
{
    public class BaseApiController : Controller
    {
        protected readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

     public BaseApiController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _context = context;
        }

        protected new IActionResult Response(object result = null, bool success = true)
        {
            if (success)
            {
                return Ok(new
                {
                    success = true,
                    data = result
                });
            }

            return BadRequest(new
            {
                success = false,
                errors = result
            });
        }

        protected UserDataModel GetLoggedUser()
        {
            var teste = User;

            if (User == null) return null;

            if (!User.Identity.IsAuthenticated) return null;

            return (
                from user in _context.Users
                where user.Email == User.Identity.Name
                select new UserDataModel()
                {
                    Email = user.Email,
                    UserId = user.Id,
                    UserName = user.UserName
                }
            ).FirstOrDefault();

        }

        protected UserDataModel GetUserDataModel(string userId)
        {
            if (User == null) return null;

            if (!User.Identity.IsAuthenticated) return null;

            try
            {
                return (
                    from user in _context.Users
                    where user.Id == userId
                    select new UserDataModel()
                    {
                        Email = user.Email,
                        UserId = user.Id,
                        UserName = user.UserName,
                    }
                ).FirstOrDefault();
            }
            catch (Exception e)
            {
                return null;
            }
        }


        public Guid GetCompanyId()
        {
            return Guid.NewGuid();
        }


    }
}