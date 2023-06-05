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
            _Url = null;
        }
        public NavigateAction(string url)
        {
            _Url = url;
        }
        public void Execute(IWebDriver driver)
        {
            try
            {
                int delaySeconds = _DelaySeconds ?? 0;
                if (delaySeconds > 0)
                {
                    Thread.Sleep(System.TimeSpan.FromSeconds(delaySeconds));
                }
                if (!string.IsNullOrWhiteSpace(_Url))
                {
                    driver.Url = _Url;
                }

            }
            catch { }
        }
    }
}