using System.Threading;
using System.Threading.Tasks;
using OpenQA.Selenium;

namespace VSSystem.ThirdParty.Selenium.Actions
{
    [Newtonsoft.Json.JsonObject(ItemNullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
    public class NavigateAction : IAction
    {
        string _Url;
        public string Url { get { return _Url; } set { _Url = value; } }
        int? _DelaySeconds;
        public int? DelaySeconds { get { return _DelaySeconds; } set { _DelaySeconds = value; } }
        public NavigateAction()
        {

        }
        public NavigateAction(string url)
        {
            _Url = url;
        }
        public Task ExecuteAsync(IWebDriver driver)
        {
            try
            {
                int delaySeconds = _DelaySeconds ?? 0;
                if (delaySeconds > 0)
                {
                    Thread.Sleep(System.TimeSpan.FromSeconds(delaySeconds));
                }
                driver.Url = _Url;
            }
            catch { }

            return Task.CompletedTask;
        }
    }
}