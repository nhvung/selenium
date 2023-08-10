using System;
using System.Collections.Generic;
using BSSystem.Service.BSTestService.Models;
using BSSystem.Service.BSTestService.Request;
using VSSystem.ThirdParty.Selenium.Actions;

namespace BSSystem.Service.BSTestService.Extensions
{
    class SeleniumTaskExtension
    {
        public static ActionTaskExt ConvertToTask(AddTestRequest requestObj, string guid = "")
        {
            DateTime utcNow = DateTime.UtcNow;
            DateTime now = DateTime.Now;
            try
            {
                if (string.IsNullOrWhiteSpace(guid))
                {
                    guid = Guid.NewGuid().ToString().ToLower();
                }
                ActionTaskExt taskObj = new ActionTaskExt(requestObj.ID, requestObj.Name, requestObj.Browser, requestObj.Resolution, (requestObj.IsIncognito?.Equals("true", StringComparison.InvariantCultureIgnoreCase) ?? false), (requestObj.IsHeadless?.Equals("true", StringComparison.InvariantCultureIgnoreCase) ?? false));
                string sessionGuid = $"{now.Ticks}_{guid}";
                taskObj.SessionGuid = sessionGuid;
                taskObj.SkypeIds = requestObj.SkypeIds;
                taskObj.Emails = requestObj.Emails;
                taskObj.CreatedTicks = utcNow.Ticks;
                List<WebAction> actionObjs = new List<WebAction>();
                actionObjs.AddRange(requestObj.Login.ToWebActions(requestObj.Url, sessionGuid));

                if (requestObj.SearchGallery != null)
                {
                    actionObjs.AddRange(requestObj.SearchGallery.ToWebActions(requestObj.Url, sessionGuid));
                }

                taskObj.Sections = actionObjs;
                return taskObj;
            }
            catch { }
            return null;
        }
    }
}