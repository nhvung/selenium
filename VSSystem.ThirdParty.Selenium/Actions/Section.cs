using System.Collections.Generic;
using System.Threading.Tasks;
using OpenQA.Selenium;

namespace VSSystem.ThirdParty.Selenium.Actions
{
    public class Section : IAction
    {
        string _Name;
        public string Name { get { return _Name; } set { _Name = value; } }
        List<IAction> _RequestActions;
        public List<IAction> RequestActions { get { return _RequestActions; } set { _RequestActions = value; } }

        public async Task ExecuteAsync(IWebDriver driver)
        {
            try
            {
                if (_RequestActions?.Count > 0)
                {
                    foreach (var actionObj in _RequestActions)
                    {
                        await actionObj.ExecuteAsync(driver);
                    }
                }
            }
            catch { }
        }
    }
}