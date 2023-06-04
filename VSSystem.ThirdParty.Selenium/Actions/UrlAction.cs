using System.Threading;
using System.Threading.Tasks;
using OpenQA.Selenium;

namespace VSSystem.ThirdParty.Selenium.Actions
{
    public class UrlAction : IAction
    {
        string _Url;
        public string Url { get { return _Url; } set { _Url = value; } }
        int _DelaySeconds;
        public int DelaySeconds { get { return _DelaySeconds; } set { _DelaySeconds = value; } }
        public UrlAction()
        {

        }
        public UrlAction(string url)
        {
            _Url = url;
        }
        public Task ExecuteAsync(IWebDriver driver)
        {
            try
            {
                if (_DelaySeconds > 0)
                {
                    Thread.Sleep(System.TimeSpan.FromSeconds(_DelaySeconds));
                }
                driver.Url = _Url;
            }
            catch { }

            return Task.CompletedTask;
        }
    }
}