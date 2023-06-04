using System.Threading;
using System.Threading.Tasks;
using VSSystem.ThirdParty.Selenium.Extensions;

namespace VSSystem.ThirdParty.Selenium
{
    public class Client
    {
        async public Task ExecuteAsync(params Actions.ActionCollection[] actionCollections)
        {
            try
            {
                if (actionCollections?.Length > 0)
                {
                    foreach (var actionCollection in actionCollections)
                    {
                        var driver = DriverExtension.CreateDriver(actionCollection.Browser, actionCollection.IsIncognito);
                        if (driver != null)
                        {
                            driver.Manage().Window.Maximize();
                            if (!string.IsNullOrWhiteSpace(actionCollection.Url))
                            {
                                driver.Url = actionCollection.Url;
                            }

                            if (actionCollection.Actions?.Count > 0)
                            {
                                foreach (var actionObj in actionCollection.Actions)
                                {
                                    await actionObj.ExecuteAsync(driver);
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