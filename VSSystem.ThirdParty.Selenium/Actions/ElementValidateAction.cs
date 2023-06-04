using System;
using System.Threading;
using OpenQA.Selenium;

namespace VSSystem.ThirdParty.Selenium.Actions
{
    public class ElementValidateAction : IValidateAction
    {
        #region Identity
        protected string _ID;
        public string ID { get { return _ID; } set { _ID = value; } }
        protected string _Name;
        public string Name { get { return _Name; } set { _Name = value; } }
        protected string _XPath;
        public string XPath { get { return _XPath; } set { _XPath = value; } }
        protected string _ClassName;
        public string ClassName { get { return _ClassName; } set { _ClassName = value; } }
        #endregion

        int _DelaySeconds;
        public int DelaySeconds { get { return _DelaySeconds; } set { _DelaySeconds = value; } }

        protected IWebElement _GetWebElement(IWebDriver driver)
        {
            if (_DelaySeconds > 0)
            {
                Thread.Sleep(System.TimeSpan.FromSeconds(_DelaySeconds));
            }
            IWebElement elementObj = null;
            if (!string.IsNullOrWhiteSpace(_ID))
            {
                try
                {
                    elementObj = driver.FindElement(By.Id(_ID));
                }
                catch { }
            }
            if (elementObj == null)
            {
                if (!string.IsNullOrWhiteSpace(_Name))
                {
                    try
                    {
                        elementObj = driver.FindElement(By.Name(_Name));
                    }
                    catch { }
                }
            }
            if (elementObj == null)
            {
                if (!string.IsNullOrWhiteSpace(_XPath))
                {
                    try
                    {
                        elementObj = driver.FindElement(By.XPath(_XPath));
                    }
                    catch { }
                }
            }
            if (elementObj == null)
            {
                if (!string.IsNullOrWhiteSpace(_ClassName))
                {
                    try
                    {
                        elementObj = driver.FindElement(By.ClassName(_ClassName));
                    }
                    catch { }
                }
            }
            return elementObj;
        }
        public bool IsCorrect(IWebDriver driver)
        {
            var elementObj = _GetWebElement(driver);
            return elementObj != null;
        }
    }
}