using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using VSSystem.Extensions.Hosting;

namespace BSSystem.Service.BSTestService.Middlewares
{
    public class ProxyMiddleware : AMiddleware
    {
        public ProxyMiddleware(RequestDelegate next) : base(next, BSHost.SERVICE_NAME)
        {
            _servicePath = string.Empty;
        }
        protected override Task _Invoke(HttpContext context, string path)
        {
            int apiIdx = path.IndexOf($"api/");
            if (apiIdx > -1)
            {
                string proxyPath = $"api/{path.Substring(apiIdx + 4)}";
                context.Request.Path = $"/{_servicePath}{proxyPath}/";
            }

            return base._Invoke(context, path);
        }

    }
}