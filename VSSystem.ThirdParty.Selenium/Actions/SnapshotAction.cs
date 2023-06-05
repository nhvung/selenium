using System.Threading;
using System.Threading.Tasks;
using OpenQA.Selenium;

namespace VSSystem.ThirdParty.Selenium.Actions
{
    public class SnapshotAction : IAction
    {
        int? _DelaySeconds;
        public int? DelaySeconds { get { return _DelaySeconds; } set { _DelaySeconds = value; } }
        public Task ExecuteAsync(IWebDriver driver)
        {
            int delaySeconds = _DelaySeconds ?? 0;
            if (delaySeconds > 0)
            {
                Thread.Sleep(System.TimeSpan.FromSeconds(delaySeconds));
            }
            try
            {
                var screenShotObj = ((ITakesScreenshot)driver).GetScreenshot();

            }
            catch { }
            return Task.CompletedTask;
        }
    }
}