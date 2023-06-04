using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Edge;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium.Safari;
using VSSystem.ThirdParty.Define;

namespace VSSystem.ThirdParty.Selenium
{
    class DriverExtension
    {
        static ChromeOptions _CreateChromeOptions(bool isIncognito)
        {
            var opts = new ChromeOptions();
            opts.AcceptInsecureCertificates = true;
            if (isIncognito)
            {
                opts.AddArgument("--incognito");
            }
            return opts;
        }
        static FirefoxOptions _CreateFirefoxOptions(bool isIncognito)
        {
            var opts = new FirefoxOptions();
            opts.AcceptInsecureCertificates = true;
            if (isIncognito)
            {
                opts.AddArgument("--incognito");
            }
            return opts;
        }
        static EdgeOptions _CreateEdgeOptions(bool isIncognito)
        {
            var opts = new EdgeOptions();
            opts.AcceptInsecureCertificates = true;
            if (isIncognito)
            {
                opts.AddArgument("--incognito");
            }
            return opts;
        }

        public static IWebDriver CreateDriver(EBrowser browser, bool isIncognito)
        {
            IWebDriver driver = null;
            try
            {
                switch (browser)
                {
                    case EBrowser.Chrome:
                        {
                            var opts = _CreateChromeOptions(isIncognito);
                            driver = new ChromeDriver(opts);
                        }
                        break;
                    case EBrowser.Firefox:
                        {
                            var opts = _CreateChromeOptions(isIncognito);
                            driver = new ChromeDriver(opts);
                        }
                        break;
                    case EBrowser.Edge:
                        {
                            var opts = _CreateChromeOptions(isIncognito);
                            driver = new ChromeDriver(opts);
                        }
                        break;
                }
            }
            catch { }
            return driver;
        }
    }
}