using OpenQA.Selenium;

namespace VSSystem.ThirdParty.Selenium.Actions
{
    public interface IValidateAction
    {
        bool IsCorrect(IWebDriver driver);
    }
}