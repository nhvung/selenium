using System;
using System.Threading.Tasks;
using VSSystem.Extensions.Hosting.Controllers;
using VSSystem.Net;

namespace VSSystem.Service.TestService.Controllers
{
    public class ScreenshotsController : AController
    {
        public ScreenshotsController() : base("ScreenshotsController", BSHost.SERVICE_NAME, BSHost.StaticLogger, BSHost.PRIVATE_KEY)
        {
        }
        protected override Task _ProcessApiContext(string path, string queryString)
        {
            try
            {
                if (path.StartsWith($"{_ServicePath}api/screenshots/", StringComparison.InvariantCultureIgnoreCase))
                {
                    return GetScreenshot(path);
                }

            }
            catch (Exception ex)
            {
                this.LogError(ex);
            }
            return this.ResponseEmptyAsync(VSSystem.Net.ContentType.Html, System.Net.HttpStatusCode.NotFound);
        }
        async Task GetScreenshot(string path)
        {
            try
            {
                int idx = path.IndexOf("api/");
                if (idx > -1)
                {
                    string rPath = path.Substring(idx + 4);
                    while (rPath.EndsWith("/"))
                    {
                        rPath = rPath.Substring(0, rPath.Length - 1);
                    }
                    string filePath = $"{ServiceConfig.pools_temp}/{rPath}";
                    if (System.IO.File.Exists(filePath))
                    {
                        await this.ResponseFileAsync(filePath, ContentType.Jpg, System.Net.HttpStatusCode.OK);
                    }
                }
            }
            catch (Exception ex)
            {
                this.LogError(ex);
            }
        }
    }
}