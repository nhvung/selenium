using System.Collections.Generic;

namespace BSSystem.Service.BSTestService.Actions
{
    public interface IAction
    {
        List<VSSystem.ThirdParty.Selenium.Actions.WebAction> ToWebActions(string baseUrl, string sessionFormat);
    }
}