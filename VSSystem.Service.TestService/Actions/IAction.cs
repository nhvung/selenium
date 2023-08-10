using System.Collections.Generic;

namespace VSSystem.Service.TestService.Actions
{
    public interface IAction
    {
        List<VSSystem.ThirdParty.Selenium.Actions.WebAction> ToWebActions(string baseUrl, string sessionFormat);
    }
}