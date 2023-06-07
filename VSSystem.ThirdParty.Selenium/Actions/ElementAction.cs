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
    public class ElementAction : AAction
    {
        #region Identity
        ElementProps _Props;
        public ElementProps Props { get { return _Props; } set { _Props = value; } }
        #endregion


        #region Actions props
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

        public ElementAction() : base()
        {
        }
        public ElementAction(string name, double? delaySeconds = null) : base(name, delaySeconds)
        {
        }

        public override bool Execute(IWebDriver driver, Action<string> debugLogAction = default, Action<Exception> errorLogAction = default) { return _Execute(driver, debugLogAction, errorLogAction); }
        protected virtual bool _Execute(IWebDriver driver, Action<string> debugLogAction, Action<Exception> errorLogAction)
        {
            if (_Props == null)
            {
                return false;
            }
            double delayMiliseconds = 50;
            if (_DelaySeconds > 0)
            {
                delayMiliseconds = Convert.ToInt32(_DelaySeconds * 1000);
            }
            if (delayMiliseconds > 0)
            {
                Thread.Sleep(System.TimeSpan.FromMilliseconds(delayMiliseconds));
            }
            try
            {
                // new WebDriverWait(driver, TimeSpan.FromSeconds(100)).Until(ite => ((IJavaScriptExecutor)ite).ExecuteScript("return document.readyState").Equals("complete"));
                IWebDriver processDriver = driver;
                if (!string.IsNullOrWhiteSpace(_Props.IFrameID))
                {
                    try
                    {
                        processDriver = processDriver.SwitchTo().Frame(_Props.IFrameID);

                    }
                    catch (Exception ex)
                    {
                        errorLogAction?.Invoke(new Exception("Change IFrame exception.", ex));
                    }
                }
                else if (_Props.SwitchToNewWindow ?? false)
                {
                    try
                    {
                        var lastWindow = driver.WindowHandles.LastOrDefault();
                        if (!string.IsNullOrWhiteSpace(lastWindow))
                        {
                            processDriver = processDriver.SwitchTo().Window(lastWindow);
                        }

                    }
                    catch (Exception ex)
                    {
                        errorLogAction?.Invoke(new Exception("Change new window exception.", ex));
                    }
                }

                if (processDriver == null)
                {
                    processDriver = driver;
                }

                var elementObj = Props.GetWebElement(processDriver);
                if (elementObj != null)
                {
                    if (_Actions?.Count > 0)
                    {
                        foreach (var actionObj in _Actions)
                        {
                            actionObj?.Execute(processDriver);
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
                                catch //(Exception ex)
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
                            new OpenQA.Selenium.Interactions.Actions(processDriver)
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
                        new OpenQA.Selenium.Interactions.Actions(processDriver)
                        // .ScrollToElement(elementObj)
                        .DoubleClick(elementObj)
                        .Perform();
                    }
                    if (_MouseIn ?? false)
                    {
                        new OpenQA.Selenium.Interactions.Actions(processDriver)
                        .MoveToElement(elementObj)
                        // .ScrollToElement(elementObj)
                        .Perform();
                    }
                    if (_ClickAndHold ?? false)
                    {
                        new OpenQA.Selenium.Interactions.Actions(processDriver)
                        // .ScrollToElement(elementObj)
                        .ClickAndHold(elementObj)
                        .Perform();
                    }
                }
            }
            catch (Exception ex)
            {
                errorLogAction?.Invoke(new Exception("Execute exception.", ex));
            }
            // try
            // {
            //     if (_Props.SwitchToNewWindow ?? false)
            //     {
            //         try
            //         {
            //             var originalWindow = driver.WindowHandles.FirstOrDefault();
            //             if (!string.IsNullOrWhiteSpace(originalWindow))
            //             {
            //                 driver = driver.SwitchTo().Window(originalWindow);
            //             }

            //         }
            //         catch { }
            //     }
            //     else
            //     {
            //         driver = driver.SwitchTo().DefaultContent();
            //     }

            // }
            // catch { }
            return true;
        }

    }
}