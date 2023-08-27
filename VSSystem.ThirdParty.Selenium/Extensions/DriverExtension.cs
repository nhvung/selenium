using System;
using System.Collections.Generic;
using System.IO;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Edge;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium.Safari;
using VSSystem.ThirdParty.Selenium.Define;
using VSSystem.ThirdParty.Selenium.Models;

namespace VSSystem.ThirdParty.Selenium.Extensions
{
    class DriverExtension
    {
        static ChromeOptions _CreateChromeOptions(bool isIncognito, bool isHeadless)
        {

            var opts = new ChromeOptions();
            opts.AcceptInsecureCertificates = true;

            if (isHeadless)
            {
                opts.AddArgument("--headless");
            }
            if (isIncognito)
            {
                opts.AddArgument("--incognito");
            }
            return opts;
        }
        static FirefoxOptions _CreateFirefoxOptions(bool isIncognito, bool isHeadless)
        {
            var opts = new FirefoxOptions();
            opts.AcceptInsecureCertificates = true;
            if (isHeadless)
            {
                opts.AddArgument("--headless");
            }
            if (isIncognito)
            {
                opts.AddArgument("--incognito");
            }
            return opts;
        }
        static EdgeOptions _CreateEdgeOptions(bool isIncognito, bool isHeadless)
        {
            var opts = new EdgeOptions();
            opts.AcceptInsecureCertificates = true;
            if (isHeadless)
            {
                opts.AddArgument("--headless");
            }
            if (isIncognito)
            {
                opts.AddArgument("--incognito");
            }
            return opts;
        }

        public static DriverInfo CreateDriver(EBrowser browser, bool isIncognito, bool isHeadless, string driverFolderPath = "")
        {
            DriverInfo result = default;
            IWebDriver driver = null;
            int pId = -1;
            try
            {
                if (string.IsNullOrWhiteSpace(driverFolderPath))
                {
                    driverFolderPath = Directory.GetCurrentDirectory();
                }
                switch (browser)
                {
                    case EBrowser.Chrome:
                        {
                            ChromeDriverService service = ChromeDriverService.CreateDefaultService(driverFolderPath);
                            service.HideCommandPromptWindow = true;
                            var opts = _CreateChromeOptions(isIncognito, isHeadless);
                            driver = new ChromeDriver(service, opts);
                            pId = service.ProcessId;
                        }
                        break;
                    case EBrowser.Firefox:
                        {
                            FirefoxDriverService service = FirefoxDriverService.CreateDefaultService(driverFolderPath);
                            service.HideCommandPromptWindow = true;
                            var opts = _CreateFirefoxOptions(isIncognito, isHeadless);
                            driver = new FirefoxDriver(service, opts);
                            pId = service.ProcessId;
                        }
                        break;
                    case EBrowser.Edge:
                        {
                            EdgeDriverService service = EdgeDriverService.CreateDefaultService(driverFolderPath);
                            service.HideCommandPromptWindow = true;
                            var opts = _CreateEdgeOptions(isIncognito, isHeadless);
                            driver = new EdgeDriver(service, opts);
                            pId = service.ProcessId;
                        }
                        break;
                }
                result = new DriverInfo(driver, pId);
            }
            catch (Exception ex)
            {

            }
            return result;
        }
    }
}