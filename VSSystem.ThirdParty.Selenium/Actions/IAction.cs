using OpenQA.Selenium;

namespace VSSystem.ThirdParty.Selenium.Actions
{
    public interface IAction
    {
        void Execute(IWebDriver driver);
    }
}