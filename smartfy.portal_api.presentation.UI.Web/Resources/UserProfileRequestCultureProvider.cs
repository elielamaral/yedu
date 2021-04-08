//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Localization;
//using System;
//using System.Threading.Tasks;

//namespace smartfy.portal_api.presentation.UI.Web.Resources
//{
//    public class UserProfileRequestCultureProvider : RequestCultureProvider
//    {


//        public override Task<ProviderCultureResult> DetermineProviderCultureResult(HttpContext httpContext)
//        {
//            if (httpContext == null)
//            {
//                throw new ArgumentNullException(nameof(httpContext));
//            }

//            if (!httpContext.User.Identity.IsAuthenticated)
//            {
//                var ck = httpContext.Request.Cookies[ConfigController.DefaultCookieName];
//                if (ck != null)
//                {
//                    return Task.FromResult(new ProviderCultureResult(ck));
//                }
//                var header = httpContext.Request.Headers["Accept-Language"].ToString();
//                if (!string.IsNullOrEmpty(header))
//                {
//                    var lang = header.ToString().Split(";")[0].Split(",")[0];
//                    return Task.FromResult(new ProviderCultureResult(lang));
//                }

//                return Task.FromResult((ProviderCultureResult)null);
//            }

//            var culture = httpContext.User.GetCulture();
//            if (culture == null)
//            {
//                return Task.FromResult((ProviderCultureResult)null);
//            }

//            return Task.FromResult(new ProviderCultureResult(culture));
//        }
//    }
//}