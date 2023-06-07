using System;
using OpenQA.Selenium;

namespace VSSystem.ThirdParty.Selenium.Actions
{
    public interface IAction
    {
        double? DelaySeconds { get; set; }
        bool Execute(IWebDriver driver, Action<string> debugLogAction = default, Action<Exception> errorLogAction = default);
    }
}