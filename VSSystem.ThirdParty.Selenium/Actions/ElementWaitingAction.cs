using System;
using System.Linq;
using System.Threading;
using OpenQA.Selenium;

namespace VSSystem.ThirdParty.Selenium.Actions
{
    [Newtonsoft.Json.JsonObject(ItemNullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
    public class ElementWaitingAction : IValidateAction
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

        int? _DelaySeconds;
        public int? DelaySeconds { get { return _DelaySeconds; } set { _DelaySeconds = value; } }

        string _Value;
        public string Value { get { return _Value; } set { _Value = value; } }
        string _Text;
        public string Text { get { return _Text; } set { _Text = value; } }
        bool? _Displayed;
        public bool? Displayed { get { return _Displayed; } set { _Displayed = value; } }
        string _IFrameID;
        public string IFrameID { get { return _IFrameID; } set { _IFrameID = value; } }
        string _ParentID;
        public string ParentID { get { return _ParentID; } set { _ParentID = value; } }
        ClassItem _ClassItem;
        public ClassItem ClassItem { get { return _ClassItem; } set { _ClassItem = value; } }
        TagItem _TagItem;
        public TagItem TagItem { get { return _TagItem; } set { _TagItem = value; } }
        bool? _SwitchToNewWindow;
        public bool? SwitchToNewWindow { get { return _SwitchToNewWindow; } set { _SwitchToNewWindow = value; } }
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
        public bool IsCorrect(IWebDriver driver)
        {
            int delaySeconds = _DelaySeconds ?? 0;
            if (delaySeconds > 0)
            {
                Thread.Sleep(System.TimeSpan.FromSeconds(delaySeconds));
            }
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
                if (_Displayed != null)
                {
                    while (elementObj.Displayed != _Displayed)
                    {
                        Thread.Sleep(1000);
                    }
                }

                return true;
            }
            return false;
        }
    }
}