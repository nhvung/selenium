using System.Collections.Generic;
using VSSystem.ThirdParty.Selenium.Define;

namespace VSSystem.ThirdParty.Selenium.Actions
{
    [Newtonsoft.Json.JsonObject(ItemNullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
    public class ActionTask
    {
        string _Name;
        public string Name { get { return _Name; } set { _Name = value; } }
        EBrowser _Browser;
        public EBrowser Browser { get { return _Browser; } set { _Browser = value; } }
        bool _IsIncognito;
        public bool IsIncognito { get { return _IsIncognito; } set { _IsIncognito = value; } }
        List<Section> _Sections;
        public List<Section> Sections { get { return _Sections; } set { _Sections = value; } }
    }
}