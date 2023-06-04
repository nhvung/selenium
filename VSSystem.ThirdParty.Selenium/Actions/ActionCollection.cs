using System.Collections.Generic;
using VSSystem.ThirdParty.Selenium.Define;

namespace VSSystem.ThirdParty.Selenium.Actions
{
    public class ActionCollection
    {
        string _Url;
        public string Url { get { return _Url; } set { _Url = value; } }
        EBrowser _Browser;
        public EBrowser Browser { get { return _Browser; } set { _Browser = value; } }
        bool _IsIncognito;
        public bool IsIncognito { get { return _IsIncognito; } set { _IsIncognito = value; } }
        List<IAction> _Actions;
        public List<IAction> Actions { get { return _Actions; } set { _Actions = value; } }
    }
}