using System;
using System.Linq;
using System.Threading;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;

namespace VSSystem.ThirdParty.Selenium.Actions
{
    [Newtonsoft.Json.JsonObject(ItemNullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
    public class ElementValidateAction : AAction
    {
        #region Identity
        ElementProps _Props;
        public ElementProps Props { get { return _Props; } set { _Props = value; } }
        #endregion

        string _Value;
        public string Value { get { return _Value; } set { _Value = value; } }
        string _Text;
        public string Text { get { return _Text; } set { _Text = value; } }
        bool? _Displayed;
        public bool? Displayed { get { return _Displayed; } set { _Displayed = value; } }

        public ElementValidateAction() : base()
        {
        }
        public ElementValidateAction(string name, double? delaySeconds = null) : base(name, delaySeconds)
        {
        }
        public override bool Execute(IWebDriver driver, Action<string> debugLogAction = default, Action<Exception> errorLogAction = default)
        {
            if (_Props == null)
            {
                return false;
            }
            int delayMiliseconds = 50;
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
                var elementObj = _Props.GetWebElement(processDriver);
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

            return false;
        }
    }
}