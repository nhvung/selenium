using System.IO;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Edge;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium.Safari;
using VSSystem.ThirdParty.Selenium.Define;

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

        public static IWebDriver CreateDriver(EBrowser browser, bool isIncognito, bool isHeadless, string driverFolderPath = "")
        {
            IWebDriver driver = null;
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
                            var opts = _CreateChromeOptions(isIncognito, isHeadless);
                            driver = new ChromeDriver(driverFolderPath, opts);
                        }
                        break;
                    case EBrowser.Firefox:
                        {
                            var opts = _CreateFirefoxOptions(isIncognito, isHeadless);
                            driver = new FirefoxDriver(driverFolderPath, opts);
                        }
                        break;
                    case EBrowser.Edge:
                        {
                            var opts = _CreateEdgeOptions(isIncognito, isHeadless);
                            driver = new EdgeDriver(driverFolderPath, opts);
                        }
                        break;
                }
            }
            catch { }
            return driver;
        }
    }
}