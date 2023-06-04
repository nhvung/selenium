using System.Threading.Tasks;
using OpenQA.Selenium;

namespace VSSystem.ThirdParty.Selenium.Actions
{
    public interface IAction
    {
        Task ExecuteAsync(IWebDriver driver);
    }
}