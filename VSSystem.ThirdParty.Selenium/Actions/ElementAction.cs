using System;
using System.Threading;
using System.Threading.Tasks;
using OpenQA.Selenium;

namespace VSSystem.ThirdParty.Selenium.Actions
{
    public class ElementAction : IAction
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


        #region Actions props
        int _DelaySeconds;
        public int DelaySeconds { get { return _DelaySeconds; } set { _DelaySeconds = value; } }
        protected string _Value;
        public string Value { get { return _Value; } set { _Value = value; } }
        bool _Click;
        public bool Click { get { return _Click; } set { _Click = value; } }
        bool _DoubleClick;
        public bool DoubleClick { get { return _DoubleClick; } set { _DoubleClick = value; } }
        bool _ClickAndHold;
        public bool ClickAndHold { get { return _ClickAndHold; } set { _ClickAndHold = value; } }
        bool _MouseIn;
        public bool MouseIn { get { return _MouseIn; } set { _MouseIn = value; } }
        bool _MouseOut;
        public bool MouseOut { get { return _MouseOut; } set { _MouseOut = value; } }
        #endregion


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

        public Task ExecuteAsync(IWebDriver driver) { return _ExecuteAsync(driver); }
        protected virtual Task _ExecuteAsync(IWebDriver driver)
        {
            var elementObj = _GetWebElement(driver);
            if (elementObj != null)
            {
                if (_DelaySeconds > 0)
                {
                    Thread.Sleep(System.TimeSpan.FromSeconds(_DelaySeconds));
                }
                if (!string.IsNullOrWhiteSpace(_Value))
                {
                    elementObj.SendKeys(_Value);
                    Thread.Sleep(100);
                }
                if (_Click)
                {
                    elementObj.Click();
                    Thread.Sleep(100);
                }
                if (_DoubleClick)
                {
                    new OpenQA.Selenium.Interactions.Actions(driver)
                    .DoubleClick(elementObj)
                    .Perform();
                }
                if (_MouseIn)
                {
                    new OpenQA.Selenium.Interactions.Actions(driver)
                    .MoveToElement(elementObj)
                    .Perform();
                }
                // if (_MouseOut)
                // {
                //     new OpenQA.Selenium.Interactions.Actions(driver)
                //     .Release(elementObj)
                //     .Perform();
                // }
                if (_ClickAndHold)
                {
                    new OpenQA.Selenium.Interactions.Actions(driver)
                    .ClickAndHold(elementObj)
                    .Perform();
                }
            }
            return Task.CompletedTask;
        }

    }
}