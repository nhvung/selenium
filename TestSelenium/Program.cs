using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json;
using VSSystem.ThirdParty.Selenium.Actions;

namespace testselenium
{
    class Program
    {
        static Dictionary<string, bool> _validateResult;
        async static Task Main(string[] args)
        {
#if PRO 
            string checkUrl = $"https://blackpinkhanoi2023.com/";
#else
            string checkUrl = $"https://blackpinkhanoi2023.com/";
            string username = "leu.vung1";
            string password = "Evidence2!";
#endif


            var client = new VSSystem.ThirdParty.Selenium.Client();

            List<WebAction> actionObjs = new List<WebAction>()
            {
                new WebAction{
                    Url = checkUrl
                },
new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.Wait){
    DelaySeconds = 1,
    Props = new ElementProps{
        XPath = "/html/body/div/div[2]/div[2]/div[5]/div[2]/div[3]/div/div/div",
        Text = "Ticket Opening Soon"
    },
    Click = true
},
new WebAction(){
    DelaySeconds = 3,
    Props = new ElementProps{
        XPath = "/html/body/div/div[2]/div[2]/div[5]/div[2]/div[3]/div/div/div",
        Text = "Buy Ticket Now"
    },
    Click = true
}
            };


            var taskParams1Obj = new VSSystem.ThirdParty.Selenium.Actions.ActionTask("Test BIQ web chrome")
            {
                IsIncognito = true,
                Browser = "chrome",
                Sections = actionObjs
            };

            var taskParams2Obj = new VSSystem.ThirdParty.Selenium.Actions.ActionTask("Test BIQ web firefox")
            {
                IsIncognito = true,
                Browser = "firefox",
                Sections = (new[]
                { actionObjs,
                }).SelectMany(ite => ite)
                .ToList()
            };

            var taskParams3Obj = new VSSystem.ThirdParty.Selenium.Actions.ActionTask("Test BIQ web edge")
            {
                IsIncognito = true,
                Browser = "edge",
                Sections = actionObjs
            };

            while (true)
            {
                ///html/body/div/div[2]/div[2]/div[5]/div[2]/div[3]/div/div
                client.Execute(new VSSystem.ThirdParty.Selenium.Actions.ActionTask[]{
                taskParams1Obj,
            // taskParams2Obj,
            // taskParams3Obj,
            },
                                                errorLogAction: ex =>
                                                {
                                                    Console.WriteLine(ex.Message);
                                                    Console.WriteLine(ex.StackTrace);
                                                    if (ex.InnerException != null)
                                                    {
                                                        Console.WriteLine(ex.InnerException.Message);
                                                        Console.WriteLine(ex.InnerException.StackTrace);
                                                    }

                                                }
                                                );
                Thread.Sleep(1000);
            }


            Thread.Sleep(Timeout.Infinite);
        }
    }
}