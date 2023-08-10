using System;
using System.Collections.Generic;
using VSSystem.ThirdParty.Selenium.Actions;

namespace BSSystem.Service.BSTestService.Actions
{
    [Newtonsoft.Json.JsonObject(ItemNullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
    public class LoginAction : AAction
    {
        string _Username;
        public string Username { get { return _Username; } set { _Username = value; } }
        string _Password;
        public string Password { get { return _Password; } set { _Password = value; } }
        public bool IsValid()
        {
            return !string.IsNullOrWhiteSpace(_Username) && !string.IsNullOrWhiteSpace(_Password);
        }
        public override List<WebAction> ToWebActions(string baseUrl, string sessionFormat)
        {
            DateTime now = DateTime.Now;
            var result = new List<VSSystem.ThirdParty.Selenium.Actions.WebAction>();
            try
            {
                result.Add(new WebAction { Url = $"{baseUrl}/login.aspx" });
                result.Add(new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.Validate)
                {
                    Title = "EVIDENCE IQ - LOGIN"
                });
                result.Add(new WebAction
                {
                    Props = new ElementProps("txtUserName")
                    {
                        Value = _Username
                    }
                });
                result.Add(new WebAction
                {
                    Props = new ElementProps("txtPassword")
                    {
                        Value = _Password
                    }
                });
                result.Add(new WebAction
                {
                    Props = new ElementProps("btnOk"),
                    Click = true
                });
                if (_pTakeScreenShot)
                {
                    result.Add(new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.ScreenShot)
                    {
                        DelaySeconds = 3,
                        FileName = "LoginResult",
                        FolderPath = string.Format("{0}/screenshots/{1}", ServiceConfig.pools_temp, string.Format(sessionFormat, now)),
                    });
                }
            }
            catch { }
            return result;
        }
    }
}