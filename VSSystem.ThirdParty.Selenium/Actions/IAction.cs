using System;
using OpenQA.Selenium;

namespace VSSystem.ThirdParty.Selenium.Actions
{
    public interface IAction
    {
        bool Execute(IWebDriver driver, Action<string> debugLogAction = default, Action<Exception> errorLogAction = default);
    }
}