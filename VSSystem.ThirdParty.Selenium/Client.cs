using System.Threading;
using System.Threading.Tasks;
using VSSystem.ThirdParty.Selenium.Extensions;

namespace VSSystem.ThirdParty.Selenium
{
    public class Client
    {
        async public Task ExecuteAsync(params Actions.ActionTask[] actionTasks)
        {
            try
            {
                if (actionTasks?.Length > 0)
                {
                    foreach (var actionTask in actionTasks)
                    {
                        var driver = DriverExtension.CreateDriver(actionTask.Browser, actionTask.IsIncognito);
                        if (driver != null)
                        {
                            driver.Manage().Window.Maximize();

                            if (actionTask.Sections?.Count > 0)
                            {
                                foreach (var section in actionTask.Sections)
                                {
                                    await section.ExecuteAsync(driver);
                                }
                            }
#if DEBUG
                            Thread.Sleep(5000);
#endif
                            driver.Quit();
                        }
                    }
                }
            }
            catch { }
        }
    }
}