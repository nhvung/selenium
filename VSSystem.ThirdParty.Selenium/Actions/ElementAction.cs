using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using VSSystem.ThirdParty.Selenium.Define;

namespace VSSystem.ThirdParty.Selenium.Actions
{
    [Newtonsoft.Json.JsonObject(ItemNullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
    public class ElementAction : IAction
    {
        #region Identity
        ElementProps _Props;
        public ElementProps Props { get { return _Props; } set { _Props = value; } }
        #endregion


        #region Actions props
        int? _DelaySeconds;
        public int? DelaySeconds { get { return _DelaySeconds; } set { _DelaySeconds = value; } }
        bool? _Click;
        public bool? Click { get { return _Click; } set { _Click = value; } }
        bool? _DoubleClick;
        public bool? DoubleClick { get { return _DoubleClick; } set { _DoubleClick = value; } }
        bool? _ClickAndHold;
        public bool? ClickAndHold { get { return _ClickAndHold; } set { _ClickAndHold = value; } }
        bool? _MouseIn;
        public bool? MouseIn { get { return _MouseIn; } set { _MouseIn = value; } }
        List<IAction> _Actions;
        public List<IAction> Actions { get { return _Actions; } set { _Actions = value; } }

        #endregion

        public Task ExecuteAsync(IWebDriver driver) { return _ExecuteAsync(driver); }
        protected virtual Task _ExecuteAsync(IWebDriver driver)
        {
            if (_Props == null)
            {
                return Task.CompletedTask;
            }
            int delaySeconds = _DelaySeconds ?? 0;
            if (delaySeconds > 0)
            {
                Thread.Sleep(System.TimeSpan.FromSeconds(delaySeconds));
            }
            try
            {
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

                var elementObj = Props.GetWebElement(driver);
                if (elementObj != null)
                {
                    if (_Actions?.Count > 0)
                    {
                        foreach (var actionObj in _Actions)
                        {
                            actionObj?.ExecuteAsync(driver);
                        }
                    }
                    if (!string.IsNullOrWhiteSpace(_Props.Value))
                    {
                        if (_Props.EType == EElementType.Select)
                        {
                            if (!string.IsNullOrWhiteSpace(_Props.Value))
                            {
                                try
                                {
                                    new SelectElement(elementObj).SelectByValue(_Props.Value);
                                }
                                catch { }
                            }
                        }
                        else
                        {
                            elementObj.SendKeys(_Props.Value);
                        }

                        Thread.Sleep(100);
                    }
                    if (!string.IsNullOrWhiteSpace(_Props.Text))
                    {
                        if (_Props.EType == EElementType.Select)
                        {
                            if (!string.IsNullOrWhiteSpace(_Props.Text))
                            {
                                try
                                {
                                    new SelectElement(elementObj).SelectByText(_Props.Text);
                                }
                                catch (Exception ex)
                                {

                                }
                            }
                        }
                        Thread.Sleep(100);
                    }
                    if (_Props.Checked != null)
                    {
                        if (elementObj.Selected != _Props.Checked)
                        {
                            new OpenQA.Selenium.Interactions.Actions(driver)
                            .MoveToElement(elementObj)
                            // .ScrollToElement(elementObj)
                            .Click()
                            .Perform();
                        }
                    }
                    if (_Click ?? false)
                    {
                        elementObj.Click();
                        Thread.Sleep(100);
                    }
                    if (_DoubleClick ?? false)
                    {
                        new OpenQA.Selenium.Interactions.Actions(driver)
                        // .ScrollToElement(elementObj)
                        .DoubleClick(elementObj)
                        .Perform();
                    }
                    if (_MouseIn ?? false)
                    {
                        new OpenQA.Selenium.Interactions.Actions(driver)
                        .MoveToElement(elementObj)
                        // .ScrollToElement(elementObj)
                        .Perform();
                    }
                    if (_ClickAndHold ?? false)
                    {
                        new OpenQA.Selenium.Interactions.Actions(driver)
                        // .ScrollToElement(elementObj)
                        .ClickAndHold(elementObj)
                        .Perform();
                    }
                }
            }
            catch (Exception ex)
            {

            }
            try
            {
                if (_Props.SwitchToNewWindow ?? false)
                {
                    try
                    {
                        var originalWindow = driver.WindowHandles.FirstOrDefault();
                        if (!string.IsNullOrWhiteSpace(originalWindow))
                        {
                            driver = driver.SwitchTo().Window(originalWindow);
                        }

                    }
                    catch { }
                }
                else
                {
                    driver = driver.SwitchTo().DefaultContent();
                }

            }
            catch { }
            return Task.CompletedTask;
        }

    }
}