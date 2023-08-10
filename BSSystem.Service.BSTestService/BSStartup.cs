using System;
using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.FileProviders;
using VSSystem.Extensions.Hosting;

namespace BSSystem.Service.BSTestService
{
    public class BSStartup : AStartup
    {
        protected override void _ConfigureMiddleware(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<Middlewares.ProxyMiddleware>();
        }
        public override void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            base.Configure(app, env);
            string webRootPath = env.WebRootPath ?? $"{env.ContentRootPath}/wwwroot";
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(webRootPath),
                RequestPath = "/autotest"

            });
            // app.UseStaticFiles(new StaticFileOptions
            // {
            //     FileProvider = new PhysicalFileProvider(webRootPath),
            //     RequestPath = "/main"
            // });
        }
    }

}