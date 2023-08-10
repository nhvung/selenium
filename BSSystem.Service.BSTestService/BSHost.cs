using BSSystem.Service.BSTestService.Extensions;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Linq;
using VSSystem.Extensions.Hosting;
using VSSystem.Logger;

namespace BSSystem.Service.BSTestService
{
    public class BSHost : AWebHost
    {
        public static string SERVICE_NAME = null;
        public static string PRIVATE_KEY = null;
        public BSHost(string name, int port, string rootName, string privateKey)
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

                #region Skype Config
                try
                {
                    string skypeSection = "skype_authentication";
                    if (_ini.Sections.Contains(skypeSection, StringComparer.InvariantCultureIgnoreCase))
                    {
                        string skypeCredentialFilePath = WorkingFolder.FullName + "/skype-cred.json";
                        string signinName = _ini.ReadValue<string>(skypeSection, "signin_name");
                        string password = _ini.ReadValue<string>(skypeSection, "password");
                        password = _descryptFunc?.Invoke(password);
                        SkypeExtension.Login(skypeCredentialFilePath, signinName, password);
                    }
                }
                catch { }
                #endregion
            }
            catch { }
        }
        protected override void _UseStartup(IWebHostBuilder webHostBuilder)
        {
            webHostBuilder.UseStartup<BSStartup>();
        }
        protected override void _InitializeInjectionServices()
        {
            _AddInjectedServices(new BSSystem.Service.BSTestService.Service.BSService(_Name, _server_ID, _rootName, _privateKey, _logger));
        }
    }
}
