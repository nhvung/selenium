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

            string checkUrl = $"https://learn-nvls.com/learn/gui/index.aspx";
            string username = "whoisphut@gmail.com";
            string password = "Password0123456!";


            var client = new VSSystem.ThirdParty.Selenium.Client();

            List<WebAction> actionObjs = new List<WebAction>()
            {
                new WebAction{
                    Url = checkUrl
                },
                new WebAction{
                    Props = new ElementProps("txtUserName"){
                        Value = username
                    }
                },
                new WebAction{
                    Props = new ElementProps("txtPassword"){
                        Value = password
                    }
                },
                new WebAction{
                    Props = new ElementProps{
                        ClassItem = new ClassProps("button100"){
                            Value="Sign in"
                        }
                    },
                    Click = true
                },
                new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.ScreenShot){
                    DelaySeconds=5,
                    FileName="signedin"
                },
                new WebAction{
                    DelaySeconds = 1,
                    Props=new ElementProps{
                        ParentID="tdControlButtonAccept",
                        TagItem=new TagProps("input", value: "Accept")
                    },
                    Click=true
                },
                new WebAction{
                    DelaySeconds = 1,
                    Props=new ElementProps("btnImgControl_1"){
                        ParentID="tdControlButton"
                    },
                    Click=true
                },
                 new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.ScreenShot){
                    DelaySeconds=5,
                     FileName="homepage"
                },
                 new WebAction{
                    DelaySeconds = 1,
                    Props=new ElementProps("ctl00_ContentPlaceHolder1_TDPlateSearchManagement_Agency"),
                    Click=true
                },
                 new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.ScreenShot){
                    DelaySeconds=5,
                     FileName="vehiclemanager"
                },
                new WebAction{
                    DelaySeconds = 1,
                    Props=new ElementProps("ctl00_ContentPlaceHolder1_imgLicensePlateQuery_User"),
                    Click=true
                },
                new WebAction{
                    DelaySeconds = 1,
                    Props=new ElementProps("ctl00_ContentPlaceHolder1_imgLicensePlate_IconUser"),
                    Click=true
                },
                 new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.ScreenShot){
                    DelaySeconds=15,
                     FileName="searchplate"
                },
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

            if (true)
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
                Thread.Sleep(10000);
            }


            Thread.Sleep(Timeout.Infinite);
        }
    }
}