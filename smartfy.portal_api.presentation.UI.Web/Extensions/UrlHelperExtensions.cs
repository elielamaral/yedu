using Microsoft.AspNetCore.Mvc;
using smartfy.portal_api.presentation.UI.Web.Controllers;

namespace smartfy.portal_api.presentation.UI.Web.Extensions
{
    public static class UrlHelperExtensions
    {
        public static string EmailConfirmationLink(this IUrlHelper urlHelper, string userId, string code, string scheme)
        {
            return string.Empty;
        }

        public static string ResetPasswordCallbackLink(this IUrlHelper urlHelper, string userId, string code, string scheme)
        {
            return string.Empty;
        }
    }
}
