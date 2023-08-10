using System.Collections.Generic;
using VSSystem.ThirdParty.Selenium.Actions;

namespace VSSystem.Service.TestService.Models
{
    [Newtonsoft.Json.JsonObject(ItemNullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
    public class ActionTaskExt : ActionTask
    {
        long _ID;
        public long ID { get { return _ID; } set { _ID = value; } }
        List<string> _SkypeIds;
        public List<string> SkypeIds { get { return _SkypeIds; } set { _SkypeIds = value; } }
        List<string> _Emails;
        public List<string> Emails { get { return _Emails; } set { _Emails = value; } }

        public ActionTaskExt(string name) : base(name)
        {
        }
        public ActionTaskExt() : base()
        {
        }
        public ActionTaskExt(long id, string name, string browser = "chrome", string resolution = "", bool isIncognito = false, bool isHeadless = false)
        : base(name, browser, resolution, isIncognito, isHeadless)
        {
            _ID = id;
        }
    }
}