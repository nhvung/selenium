using VSSystem.Service.TestService.Extensions;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Linq;
using VSSystem.Extensions.Hosting;
using VSSystem.Logger;

namespace VSSystem.Service.TestService
{
    public class VSHost : AWebHost
    {
        public static string SERVICE_NAME = null;
        public static string PRIVATE_KEY = null;
        public VSHost(string name, int port, string rootName, string privateKey)
            : base(name, port, rootName, privateKey)
        {
            if (string.IsNullOrWhiteSpace(SERVICE_NAME))
            {
                SERVICE_NAME = _Name;
            }
        }
        public static ALogger StaticLogger = null;
        protected override void _InitializeLogger()
        {
            base._InitializeLogger();
            StaticLogger = _logger;
        }

        protected override void _UseConfiguration(string[] args)
        {
            base._UseConfiguration(args);
            PRIVATE_KEY = _privateKey;

            try
            {
                var globalIni = _LoadGlobalConfiguration().Result;


            }
            catch { }
        }
        protected override void _UseStartup(IWebHostBuilder webHostBuilder)
        {
            webHostBuilder.UseStartup<VSStartup>();
        }
        protected override void _InitializeInjectionServices()
        {
            _AddInjectedServices(new VSSystem.Service.TestService.Service.VSService(_Name, _server_ID, _rootName, _privateKey, _logger));
        }
    }
}
