using System;
using System.Collections.Generic;
using System.Linq;
using VSSystem.ThirdParty.Selenium.Define;

namespace VSSystem.ThirdParty.Selenium.Actions
{
    [Newtonsoft.Json.JsonObject(ItemNullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
    public class ActionTask
    {
        string _Name;
        public string Name { get { return _Name; } set { _Name = value; } }
        string _SessionGuid;
        public string SessionGuid { get { return _SessionGuid; } set { _SessionGuid = value; } }
        string _Browser;
        public string Browser { get { return _Browser; } set { _Browser = value; } }
        [Newtonsoft.Json.JsonIgnore]
        public EBrowser EBrowser
        {
            get
            {
                EBrowser result = EBrowser.Undefine;
                if (!string.IsNullOrWhiteSpace(_Browser))
                {
                    Enum.TryParse(_Browser, true, out result);
                }
                return result;
            }
        }
        bool _IsIncognito;
        public bool IsIncognito { get { return _IsIncognito; } set { _IsIncognito = value; } }
        string _Resolution;
        public string Resolution { get { return _Resolution; } set { _Resolution = value; } }
        List<WebAction> _Sections;
        public List<WebAction> Sections { get { return _Sections; } set { _Sections = value; } }
        long _CreatedTicks;
        public long CreatedTicks { get { return _CreatedTicks; } set { _CreatedTicks = value; } }
        public ActionTask(string name)
        {
            _Name = name;
        }
        public ActionTask()
        {
        }
        public ActionTask(string name, string browser = "chrome", string resolution = "", bool isIncognito = false)
        {
            _Name = name;
            _Browser = browser;
            _IsIncognito = isIncognito;
            _Resolution = resolution;
        }
    }
}