using System.Collections.Generic;

namespace BSSystem.Service.BSTestService.Request
{
    [Newtonsoft.Json.JsonObject(ItemNullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
    public class RunTestRequest
    {
        List<string> _Names;
        public List<string> Names { get { return _Names; } set { _Names = value; } }
        List<string> _SkypeIds;
        public List<string> SkypeIds { get { return _SkypeIds; } set { _SkypeIds = value; } }
        List<string> _Emails;
        public List<string> Emails { get { return _Emails; } set { _Emails = value; } }
    }
}