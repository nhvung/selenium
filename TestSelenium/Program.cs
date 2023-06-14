using System;
using System.Collections.Generic;
using System.Linq;
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



            // string checkUrl = $"https://14.161.7.248:4431/ballisticsearch";
            string checkUrl = $"https://sandbox.evidenceiq.com/biq";
            var client = new VSSystem.ThirdParty.Selenium.Client();

            // try
            // {
            //     client.Execute("./tasks/Test BIQ web firefox.json");
            //     return;
            // }
            // catch { }

            var sections = new System.Collections.Generic.List<VSSystem.ThirdParty.Selenium.Actions.WebAction>();
            var loginSection = new VSSystem.ThirdParty.Selenium.Actions.WebAction("Test Login");
            loginSection.Actions = new List<VSSystem.ThirdParty.Selenium.Actions.WebAction>(){

                new WebAction(){Url = checkUrl},
                 new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.ScreenShot){
                    DelaySeconds = 1,
                    FileName = "Browse to BIQ",
                },
                new WebAction{
                    Props=new ElementProps("txtUserName"){Value="leu.vung1"}
                },
                 new WebAction{
                    Props=new ElementProps("txtPassword"){Value="Evidence2!"}
                },
                new WebAction{
                    Props=new ElementProps("btnOk"),
                    Click = true
                },
                new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.ScreenShot){
                    DelaySeconds = 1,
                    FileName = "Logged in",
                },
                 new WebAction(){DelaySeconds = 1},
            };

            sections.Add(loginSection);

            var gotoBIQ = new VSSystem.ThirdParty.Selenium.Actions.WebAction("Go to BIQ");
            gotoBIQ.Actions = new List<VSSystem.ThirdParty.Selenium.Actions.WebAction>(){

                new WebAction{
                    Props=new ElementProps("dvBallistics"),
                    MouseIn = true
                },
                new WebAction{
                    DelaySeconds = 1,
                    Props=new ElementProps("dvBallistics"),
                    Click = true
                },
                new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.ScreenShot){
                    DelaySeconds = 1,
                    FileName = "Go to BIQ",
                },
                new WebAction(){
                    DelaySeconds = 1,
                    Props=new ElementProps(){
                        ClassItem=new ClassProps("icon_function", 0)
                    },
                    MouseIn = true
                },
                new WebAction(){
                    DelaySeconds = 1,
                    Props=new ElementProps(){
                        ClassItem=new ClassProps("icon_function", 1)
                    },
                    MouseIn = true
                },
                new WebAction(){
                    DelaySeconds = 1,
                    Props=new ElementProps(){
                        ClassItem=new ClassProps("icon_function", 2)
                    },
                    MouseIn = true
                },
                 new WebAction(){
                    DelaySeconds = 1,
                    Props=new ElementProps(){
                        ClassItem=new ClassProps("icon_function", 2)
                    },
                    Click = true
                },
                new WebAction(){
                    DelaySeconds = 5,
                    Props=new ElementProps("btnCancel"){
                        IFrameID = "GCTIFrame"
                    },
                    Click = true
                },
                new WebAction(){
                    DelaySeconds = 5,
                    Props=new ElementProps(){
                        ClassItem=new ClassProps("button100_green", "", "Search")
                    },
                    Click = true
                },
                new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.ScreenShot){
                    DelaySeconds = 10,
                    FileName = "Go to search gallery",
                },

                 new WebAction(){DelaySeconds = 1},
            };

            sections.Add(gotoBIQ);

            var taskParams1Obj = new VSSystem.ThirdParty.Selenium.Actions.ActionTask("Test BIQ web chrome")
            {
                IsIncognito = true,
                Browser = "chrome",
                Sections = sections
            };

            var taskParams2Obj = new VSSystem.ThirdParty.Selenium.Actions.ActionTask("Test BIQ web firefox")
            {
                IsIncognito = true,
                Browser = "firefox",
                Sections = (new[]
                { sections,
                }).SelectMany(ite => ite)
                .ToList()
            };

            var taskParams3Obj = new VSSystem.ThirdParty.Selenium.Actions.ActionTask("Test BIQ web edge")
            {
                IsIncognito = true,
                Browser = "edge",
                Sections = sections
            };

            client.Execute(new VSSystem.ThirdParty.Selenium.Actions.ActionTask[]{
                // taskParams1Obj,
            taskParams2Obj,
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
        }
    }
}