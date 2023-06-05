using OpenQA.Selenium;

namespace VSSystem.ThirdParty.Selenium.Actions
{
    public interface IWaitingAction
    {
        void Wait(IWebDriver driver);
    }
}