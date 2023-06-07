using System;
using System.Linq;
using OpenQA.Selenium;
using VSSystem.ThirdParty.Selenium.Define;

namespace VSSystem.ThirdParty.Selenium.Actions
{
    [Newtonsoft.Json.JsonObject(ItemNullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
    public class ElementProps
    {
        string _ID;
        public string ID { get { return _ID; } set { _ID = value; } }
        string _Name;
        public string Name { get { return _Name; } set { _Name = value; } }
        string _XPath;
        public string XPath { get { return _XPath; } set { _XPath = value; } }
        ClassProps _ClassItem;
        public ClassProps ClassItem { get { return _ClassItem; } set { _ClassItem = value; } }
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
        TagProps _TagItem;
        public TagProps TagItem { get { return _TagItem; } set { _TagItem = value; } }
        bool? _SwitchToNewWindow;
        public bool? SwitchToNewWindow { get { return _SwitchToNewWindow; } set { _SwitchToNewWindow = value; } }
        string _Value;
        public string Value { get { return _Value; } set { _Value = value; } }
        string _Text;
        public string Text { get { return _Text; } set { _Text = value; } }
        bool? _Checked;
        public bool? Checked { get { return _Checked; } set { _Checked = value; } }

        public IWebElement GetWebElement(IWebDriver driver)
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
#if DEBUG
                    if (_ID == "ctl00_ContentPlaceHolder1_btnQuickSearch")
                    {

                    }
#endif

                    elementObj = searchCtx.FindElement(By.Id(_ID));
                }
                catch //(Exception ex)
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
                    catch //(Exception ex)
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
    }
}