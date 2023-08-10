using System.Collections.Generic;
using BSSystem.Service.BSTestService.Actions;

namespace BSSystem.Service.BSTestService.Request
{
    [Newtonsoft.Json.JsonObject(ItemNullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
    public class AddTestRequest
    {
        long _ID;
        public long ID { get { return _ID; } set { _ID = value; } }
        string _Guid;
        public string Guid { get { return _Guid; } set { _Guid = value; } }
        string _Name;
        public string Name { get { return _Name; } set { _Name = value; } }
        string _Browser;
        public string Browser { get { return _Browser; } set { _Browser = value; } }
        string _IsIncognito;
        public string IsIncognito { get { return _IsIncognito; } set { _IsIncognito = value; } }
        string _IsHeadless;
        public string IsHeadless { get { return _IsHeadless; } set { _IsHeadless = value; } }
        string _Resolution;
        public string Resolution { get { return _Resolution; } set { _Resolution = value; } }
        string _Url;
        public string Url { get { return _Url; } set { _Url = value; } }
        LoginAction _Login;
        public LoginAction Login { get { return _Login; } set { _Login = value; } }
        SearchGalleryAction _SearchGallery;
        public SearchGalleryAction SearchGallery { get { return _SearchGallery; } set { _SearchGallery = value; } }
        object _Schedule;
        public object Schedule { get { return _Schedule; } set { _Schedule = value; } }
        List<string> _SkypeIds;
        public List<string> SkypeIds { get { return _SkypeIds; } set { _SkypeIds = value; } }
        List<string> _Emails;
        public List<string> Emails { get { return _Emails; } set { _Emails = value; } }
        string _RunImmediately;
        public string RunImmediately { get { return _RunImmediately; } set { _RunImmediately = value; } }
        string _CreatorName;
        public string CreatorName { get { return _CreatorName; } set { _CreatorName = value; } }
    }
}