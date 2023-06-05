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
        protected string _ID;
        public string ID { get { return _ID; } set { _ID = value; } }
        protected string _Name;
        public string Name { get { return _Name; } set { _Name = value; } }
        protected string _XPath;
        public string XPath { get { return _XPath; } set { _XPath = value; } }
        ClassItem _ClassItem;
        public ClassItem ClassItem { get { return _ClassItem; } set { _ClassItem = value; } }
        string _Type;
        public string Type { get { return _Type; } set { _Type = value; } }
        [Newtonsoft.Json.JsonIgnore]
        public EElementType EType
        {
            get
            {
                EElementType result = EElementType.Undefine;
                if (!string.IsNullOrWhiteSpace(_Type))
                {
                    Enum.TryParse(_Type, true, out result);
                }
                return result;
            }
        }
        string _IFrameID;
        public string IFrameID { get { return _IFrameID; } set { _IFrameID = value; } }
        string _ParentID;
        public string ParentID { get { return _ParentID; } set { _ParentID = value; } }
        TagItem _TagItem;
        public TagItem TagItem { get { return _TagItem; } set { _TagItem = value; } }
        bool? _SwitchToNewWindow;
        public bool? SwitchToNewWindow { get { return _SwitchToNewWindow; } set { _SwitchToNewWindow = value; } }
        #endregion


        #region Actions props
        int? _DelaySeconds;
        public int? DelaySeconds { get { return _DelaySeconds; } set { _DelaySeconds = value; } }
        protected string _Value;
        public string Value { get { return _Value; } set { _Value = value; } }
        protected string _Text;
        public string Text { get { return _Text; } set { _Text = value; } }
        bool? _Checked;
        public bool? Checked { get { return _Checked; } set { _Checked = value; } }
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


        protected IWebElement _GetWebElement(IWebDriver driver)
        {

            IWebElement elementObj = null;
            ISearchContext searchCtx = driver;
            if (!string.IsNullOrWhiteSpace(_ParentID))
            {
                try
                {
                    searchCtx = driver.FindElement(By.Id(_ParentID));
                }
                catch { }
            }

            if (!string.IsNullOrWhiteSpace(_ID))
            {
                try
                {
                    elementObj = searchCtx.FindElement(By.Id(_ID));
                }
                catch (Exception ex)
                {

                }
            }
            if (elementObj == null)
            {
                if (!string.IsNullOrWhiteSpace(_Name))
                {
                    try
                    {
                        elementObj = searchCtx.FindElement(By.Name(_Name));
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

                        elementObj = searchCtx.FindElement(By.XPath(_XPath));
                    }
                    catch (Exception ex)
                    {

                    }
                }
            }
            if (elementObj == null)
            {
                if (!string.IsNullOrWhiteSpace(_ClassItem?.ClassName))
                {
                    try
                    {
                        var foundElementObjs = searchCtx.FindElements(By.ClassName(_ClassItem.ClassName))?.Where(ite => ite.Displayed)?.ToList();
                        if (foundElementObjs?.Count > 0)
                        {
                            if (!string.IsNullOrWhiteSpace(_ClassItem.Value))
                            {
                                elementObj = foundElementObjs.FirstOrDefault(ite => ite.GetAttribute("value")?.Equals(_ClassItem.Value) ?? false);
                            }
                            if (elementObj == null)
                            {
                                if (!string.IsNullOrWhiteSpace(_ClassItem.Text))
                                {
                                    elementObj = foundElementObjs.FirstOrDefault(ite => ite.Text?.Equals(_ClassItem.Text) ?? false);
                                }
                            }
                            if (elementObj == null)
                            {
                                int index = _ClassItem.Index ?? foundElementObjs.Count;
                                if (_ClassItem.Index < foundElementObjs.Count)
                                {
                                    elementObj = foundElementObjs.ElementAtOrDefault(index);
                                }
                            }
                        }
                    }
                    catch { }
                }
            }
            if (elementObj == null)
            {
                if (!string.IsNullOrWhiteSpace(_TagItem?.TagName))
                {
                    try
                    {
                        var foundElementObjs = searchCtx.FindElements(By.TagName(_TagItem.TagName))?.Where(ite => ite.Displayed)?.ToList();
                        if (foundElementObjs?.Count > 0)
                        {
                            if (!string.IsNullOrWhiteSpace(_TagItem.Value))
                            {
                                elementObj = foundElementObjs.FirstOrDefault(ite => ite.GetAttribute("value")?.Equals(_TagItem.Value) ?? false);
                            }
                            if (elementObj == null)
                            {
                                if (!string.IsNullOrWhiteSpace(_TagItem.Text))
                                {
                                    elementObj = foundElementObjs.FirstOrDefault(ite => ite.Text?.Equals(_TagItem.Text) ?? false);
                                }
                            }
                            if (elementObj == null)
                            {
                                int index = _TagItem.Index ?? foundElementObjs.Count;
                                if (_TagItem.Index < foundElementObjs.Count)
                                {
                                    elementObj = foundElementObjs.ElementAtOrDefault(index);
                                }
                            }
                        }
                    }
                    catch { }
                }
            }



            return elementObj;
        }

        public Task ExecuteAsync(IWebDriver driver) { return _ExecuteAsync(driver); }
        protected virtual Task _ExecuteAsync(IWebDriver driver)
        {
            int delaySeconds = _DelaySeconds ?? 0;
            if (delaySeconds > 0)
            {
                Thread.Sleep(System.TimeSpan.FromSeconds(delaySeconds));
            }
            try
            {
                if (!string.IsNullOrWhiteSpace(_IFrameID))
                {
                    try
                    {
                        driver = driver.SwitchTo().Frame(_IFrameID);
                    }
                    catch { }
                }

                if (_SwitchToNewWindow ?? false)
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

                var elementObj = _GetWebElement(driver);
                if (elementObj != null)
                {
                    if (_Actions?.Count > 0)
                    {
                        foreach (var actionObj in _Actions)
                        {
                            actionObj?.ExecuteAsync(driver);
                        }
                    }
                    if (!string.IsNullOrWhiteSpace(_Value))
                    {
                        if (EType == EElementType.Select)
                        {
                            if (!string.IsNullOrWhiteSpace(_Value))
                            {
                                try
                                {
                                    new SelectElement(elementObj).SelectByValue(_Value);
                                }
                                catch { }
                            }
                        }
                        else
                        {
                            elementObj.SendKeys(_Value);
                        }

                        Thread.Sleep(100);
                    }
                    if (!string.IsNullOrWhiteSpace(_Text))
                    {
                        if (EType == EElementType.Select)
                        {
                            if (!string.IsNullOrWhiteSpace(_Text))
                            {
                                try
                                {
                                    new SelectElement(elementObj).SelectByText(_Text);
                                }
                                catch (Exception ex)
                                {

                                }
                            }
                        }
                        Thread.Sleep(100);
                    }
                    if (_Checked != null)
                    {
                        if (elementObj.Selected != _Checked)
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
                if (_SwitchToNewWindow ?? false)
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