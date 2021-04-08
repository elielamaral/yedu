using Microsoft.AspNetCore.Http;
using System.IO;
using System.Threading.Tasks;

namespace smartfy.portal_api.presentation.UI.Web.Extensions
{
    public static class FormFileExtensions
    {
        public static byte[] ToByteArray(this IFormFile file)
        {
            using (var ms = new MemoryStream())
            {
                //FormFile to ByteArray
                file.CopyTo(ms);
                return ms.ToArray();
            }
        }
        public static async Task<byte[]> GetBytes(this IFormFile formFile)
        {
            using (var memoryStream = new MemoryStream())
            {
                await formFile.CopyToAsync(memoryStream);
                return memoryStream.ToArray();
            }
        }

        public static FileInfo ToFileInfo(this IFormFile file)
        {
            using (var ms = new MemoryStream())
            {
                file.CopyTo(ms);

                var randomFile = Path.GetRandomFileName();
                using (FileStream filestream = new FileStream(randomFile,FileMode.Create, System.IO.FileAccess.Write))
                {
                    byte[] bytes = new byte[ms.Length];
                    ms.Read(bytes, 0, (int)ms.Length);
                    filestream.Write(bytes, 0, bytes.Length);
                    ms.Close();

                    return new FileInfo(randomFile);
                }
            }

            
        }
    }
}
