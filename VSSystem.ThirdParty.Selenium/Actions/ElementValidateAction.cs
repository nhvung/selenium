using System;
using System.Linq;
using System.Threading;
using OpenQA.Selenium;

namespace VSSystem.ThirdParty.Selenium.Actions
{
    [Newtonsoft.Json.JsonObject(ItemNullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
    public class ElementValidateAction : IAction
    {
        #region Identity
        ElementProps _Props;
        public ElementProps Props { get { return _Props; } set { _Props = value; } }
        #endregion

        int? _DelaySeconds;
        public int? DelaySeconds { get { return _DelaySeconds; } set { _DelaySeconds = value; } }

        string _Value;
        public string Value { get { return _Value; } set { _Value = value; } }
        string _Text;
        public string Text { get { return _Text; } set { _Text = value; } }
        bool? _Displayed;
        public bool? Displayed { get { return _Displayed; } set { _Displayed = value; } }


        public bool Execute(IWebDriver driver)
        {
            if (_Props == null)
            {
                return false;
            }
            int delaySeconds = _DelaySeconds ?? 1;
            if (delaySeconds > 0)
            {
                Thread.Sleep(System.TimeSpan.FromSeconds(delaySeconds));
            }
            if (!string.IsNullOrWhiteSpace(_Props.IFrameID))
            {
                try
                {
                    driver = driver.SwitchTo().Frame(_Props.IFrameID);
                }
                catch { }
            }

            if (_Props.SwitchToNewWindow ?? false)
            {
                try
                {
                    var lastWindow = driver.WindowHandles.LastOrDefault();
                    if (!string.IsNullOrWhiteSpace(lastWindow))
                    {
                        driver = driver.SwitchTo().Window(lastWindow);
                    }

                }
                catch { }
            }
            var elementObj = _Props.GetWebElement(driver);
            if (elementObj != null)
            {
                if (_Displayed != null)
                {
                    if (elementObj.Displayed != _Displayed)
                    {
                        return false;
                    }
                }
                if (!string.IsNullOrWhiteSpace(_Text))
                {
                    if (!elementObj.Text?.Equals(_Text) ?? false)
                    {
                        return false;
                    }
                }
                if (!string.IsNullOrWhiteSpace(_Value))
                {
                    if (!elementObj.GetAttribute("value")?.Equals(_Value) ?? false)
                    {
                        return false;
                    }
                }
                return true;
            }
            return false;
        }
    }
}