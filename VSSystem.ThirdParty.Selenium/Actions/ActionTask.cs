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
        List<Section> _Sections;
        public List<Section> Sections { get { return _Sections; } set { _Sections = value; } }

        [Newtonsoft.Json.JsonIgnore]
        public bool IsCorrect
        {
            get
            {
                if (_Sections?.Count > 0)
                {
                    return _Sections.All(ite => ite.IsCorrect);
                }
                return false;
            }
        }
        public ActionTask(string name)
        {
            _Name = name;
        }
        public ActionTask()
        {
        }
    }
}