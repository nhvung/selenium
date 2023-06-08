using System;
using System.Threading;
using OpenQA.Selenium;

namespace VSSystem.ThirdParty.Selenium.Actions
{
    [Newtonsoft.Json.JsonObject(ItemNullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
    public class NavigateWaitingAction : NavigateAction
    {
        protected Func<string, string, bool> _urlPredicate;
        public NavigateWaitingAction() : base()
        {
        }
        public NavigateWaitingAction(string url, Func<string, string, bool> urlPredicate = null) : base(url)
        {
            _urlPredicate = urlPredicate;
            if (_urlPredicate == null)
            {
                _urlPredicate = (url1, url2) => url1.Equals(url2, StringComparison.InvariantCultureIgnoreCase);
            }
        }
        public override bool Execute(IWebDriver driver, Action<string> debugLogAction, Action<Exception> errorLogAction)
        {
            try
            {
                int delayMiliseconds = 50;
                if (_DelaySeconds > 0)
                {
                    delayMiliseconds = Convert.ToInt32(_DelaySeconds * 1000);
                }
                if (delayMiliseconds > 0)
                {
                    Thread.Sleep(System.TimeSpan.FromMilliseconds(delayMiliseconds));
                }
                if (!string.IsNullOrWhiteSpace(_Url))
                {
                    do
                    {
                        bool compareResult = _urlPredicate(driver.Url, _Url);
                        if (compareResult)
                        {
                            break;
                        }
                        Thread.Sleep(500);
                    } while (true);
                }

            }
            catch (Exception ex)
            {
                errorLogAction?.Invoke(new Exception("Execute exception.", ex));
            }
            return false;
        }
    }
}