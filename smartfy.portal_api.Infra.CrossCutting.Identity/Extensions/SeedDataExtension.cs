using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using smartfy.portal_api.domain.Entities;
using smartfy.portal_api.Infra.CrossCutting.Identity.Data;
using smartfy.portal_api.Infra.CrossCutting.Identity.Entities;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace smartfy.portal_api.presentation.UI.Web.Extensions
{
    public static class SeedDataExtension
    {
        public static async void CreateRoles(this IServiceProvider serviceProvider)
        {
            try
            {
                var RoleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();

                if (!RoleManager.RoleExistsAsync("Aluno").Result)
                {
                    var roleResult = await RoleManager.CreateAsync(new IdentityRole("Aluno"));
                }

                if (!RoleManager.RoleExistsAsync("Admin").Result)
                {
                    if (RoleManager.CreateAsync(new IdentityRole("Admin")).Result.Succeeded)
                    {
                        CreateDefaultUsersAsync(serviceProvider);
                    }
                    
                }

                CreateDefaultUsersAsync(serviceProvider);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

        }

        public static async Task CreateDefaultUsersAsync(this IServiceProvider serviceProvider)
        {
            try
            {
                var Db = serviceProvider.GetRequiredService<ApplicationDbContext>();

                var UserManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();
                var user = new ApplicationUser { 
                    UserName = "yedu@smartfy.net.br", 
                    Email = "yedu@smartfy.net.br", 
                    Enabled = true
                };

                await UserManager.CreateAsync(user, "yedu123");

                Db.SaveChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }
    }
}