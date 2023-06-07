using System;
using System.Threading;
using OpenQA.Selenium;

namespace VSSystem.ThirdParty.Selenium.Actions
{
    [Newtonsoft.Json.JsonObject(ItemNullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
    public class NavigateAction : IAction
    {
        protected string _Url;
        public string Url { get { return _Url; } set { _Url = value; } }
        protected double? _DelaySeconds;
        public double? DelaySeconds { get { return _DelaySeconds; } set { _DelaySeconds = value; } }
        public NavigateAction()
        {
            _Url = null;
        }
        public NavigateAction(string url)
        {
            _Url = url;
        }
        public virtual bool Execute(IWebDriver driver, Action<string> debugLogAction, Action<Exception> errorLogAction)
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
                    if (driver.Url?.Equals(_Url) ?? false)
                    {
                        return true;
                    }
                    driver.Url = _Url;
                }

            }
            catch (Exception ex)
            {
                errorLogAction?.Invoke(new Exception("Execute exception.", ex));
            }
            return true;
        }
    }
}