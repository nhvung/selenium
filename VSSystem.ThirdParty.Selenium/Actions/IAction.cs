using System;
using OpenQA.Selenium;
using VSSystem.ThirdParty.Selenium.Define;

namespace VSSystem.ThirdParty.Selenium.Actions
{
    [Newtonsoft.Json.JsonObject(ItemNullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
    public interface IAction
    {
        double? DelaySeconds { get; set; }
        [Newtonsoft.Json.JsonIgnore]
        EActionType EType { get; }
        bool Execute(IWebDriver driver, Action<string> debugLogAction = default, Action<Exception> errorLogAction = default);
    }
}