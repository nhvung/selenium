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
                    FileName = "Step1.BrowseToBIQ",
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
                    FileName = "Step2.LoggedIn",
                },
                 new WebAction(){DelaySeconds = 1},
            };

            sections.Add(loginSection);

            var gotoBIQ = new VSSystem.ThirdParty.Selenium.Actions.WebAction("Go to BIQ");
            gotoBIQ.Actions = new List<VSSystem.ThirdParty.Selenium.Actions.WebAction>(){

                new WebAction{
                    DelaySeconds = 1,
                    Props=new ElementProps("dvBallistics"),
                    Click = true
                },
                new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.ScreenShot){
                    DelaySeconds = 3,
                    FileName = "Step3.GoToBIQ",
                },
                 new WebAction(){
                    DelaySeconds = 1,
                    Props=new ElementProps(){
                        ClassItem=new ClassProps("icon_function", 2)
                    },
                    Click = true
                },
                new WebAction(){
                    DelaySeconds =5,
                    Props=new ElementProps("btnCancel"){
                        IFrameID = "GCTIFrame"
                    },
                    Click = true
                },
                 new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.ScreenShot){
                    DelaySeconds = 3,
                    FileName = "Step4.GalleryPage",
                },
                new WebAction(){
                    DelaySeconds = 3,
                    Props=new ElementProps(){
                        ClassItem=new ClassProps("button100_green", "", "Search")
                    },
                    Click = true
                },
                 new WebAction(){
                    DelaySeconds = 1,
                    Props=new ElementProps("txtCaseNumber"){
                        IFrameID = "GCTIFrame",
                        Value = "test selenium"
                    },
                },
                new WebAction(){
                    DelaySeconds = 1,
                    Props=new ElementProps("btnContinue"){
                        IFrameID = "GCTIFrame"
                    },
                    Click = true
                },
                new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.ScreenShot){
                    DelaySeconds = 5,
                    FileName = "Step5.SearchGalleryResult",
                },

                // new WebAction(){
                //     DelaySeconds = 3,
                //     Props=new ElementProps(){
                //         ParentID = "resultview",
                //         ClassItem=new ClassProps("ajxitem", 1)
                //     },
                //     DoubleClick = true
                // },
                // new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.ScreenShot){
                //     Props=new ElementProps(){SwitchToNewWindow = true, CloseWindow = true},
                //     DelaySeconds = 5,
                //     FileName = "Step6.GalleryDetail",
                // },

                new WebAction(){
                    Props=new ElementProps(){
                        ParentID = "resultview",
                        ClassItem=new ClassProps("ajaxselect", 0)
                    },
                    Click = true
                },
                 new WebAction(){
                    Props=new ElementProps(){
                        ParentID = "resultview",
                        ClassItem=new ClassProps("ajaxselect", 1)
                    },
                    Click = true
                },
                new WebAction(){
                    Props=new ElementProps(){
                        ParentID = "resultview",
                        ClassItem=new ClassProps("ajaxselect", 2)
                    },
                    Click = true
                },
                new WebAction(){
                    Props=new ElementProps(){
                        ParentID = "resultview",
                        ClassItem=new ClassProps("ajaxselect", 3)
                    },
                    Click = true
                },
                new WebAction(){
                    Props=new ElementProps(){
                        ParentID = "resultview",
                        ClassItem=new ClassProps("ajaxselect", 4)
                    },
                    Click = true
                },
                new WebAction(){
                    Props=new ElementProps(){
                        ParentID = "resultview",
                        ClassItem=new ClassProps("ajaxselect", 5)
                    },
                    Click = true
                },
                new WebAction(){
                    Props=new ElementProps(){
                        ParentID = "resultview",
                        ClassItem=new ClassProps("ajaxselect", 6)
                    },
                    Click = true
                },
                new WebAction(){
                    Props=new ElementProps(){
                        ParentID = "resultview",
                        ClassItem=new ClassProps("ajaxselect", 7)
                    },
                    Click = true
                },
                new WebAction(){
                    Props=new ElementProps(){
                        ParentID = "resultview",
                        ClassItem=new ClassProps("ajaxselect", 8)
                    },
                    Click = true
                },
                new WebAction(){
                    Props=new ElementProps(){
                        ParentID = "resultview",
                        ClassItem=new ClassProps("ajaxselect", 9)
                    },
                    Click = true
                },
                new WebAction(){
                    Props=new ElementProps(){
                        ParentID = "resultview",
                        ClassItem=new ClassProps("ajaxselect", 10)
                    },
                    Click = true
                },

                new WebAction(){
                    DelaySeconds = 1,
                    Props=new ElementProps("ctl00_ContentPlaceHolder1_btnAnalysisReport"),
                    Click = true,
                    AltKey= true
                },

                new WebAction(){
                    DelaySeconds = 1,
                    Props = new ElementProps(){
                        ParentID = "dvSelectEngineCSA_Content",
                        TagItem = new TagProps("label", text: "Engine 7.9.0.2 SN")
                    },
                    Click=true
                },
                new WebAction(){
                    DelaySeconds = 1,
                    Props = new ElementProps(){
                        ParentID = "dvSelectEngineCSA",
                        TagItem = new TagProps("input", value: "CSA Report")
                    },
                    Click=true
                },
                new WebAction(){
                    DelaySeconds = 5,
                    Props=new ElementProps() {
                        SwitchToNewWindow = true,
                        CloseWindow = true
                    },
                    Actions = new List<WebAction>(){

                        new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.Wait){
                            DelaySeconds = 3,
                            Props=new ElementProps("loadingUI"){
                                Displayed = false
                            },
                        },
                        new WebAction(){
                            DelaySeconds = 3,
                            Props = new ElementProps(){
                                TagItem = new TagProps("button", text: "Wait")
                            },
                            Click = true
                        },
                         new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.Wait){
                            DelaySeconds = 3,
                            Props=new ElementProps("loadingUI"){
                                Displayed = false
                            },
                        },
                        new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.ScreenShot){
                            DelaySeconds = 3,
                            FileName = "Step6.RunCSA",
                        },
                    }
                },


            };

            sections.Add(gotoBIQ);

            var searchPL = new VSSystem.ThirdParty.Selenium.Actions.WebAction("Search PL");
            searchPL.Actions = new List<WebAction>()
            {
                // new WebAction(){
                //     Url = "https://sandbox.evidenceiq.com/biq/GUI/QuickSearch.aspx?obj=42458212843648846&origin=42458212843627352#afd1afb0188f45f391aae95a58a1c658"
                // },
                new WebAction(){
                    DelaySeconds = 1,
                    Props=new ElementProps("ctl00_ContentPlaceHolder1_btnSearchFace"),
                    Click = true
                },
                new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.Wait){
                    DelaySeconds = 10,
                    Props=new ElementProps(){
                        Displayed = false,
                        ClassItem = new ClassProps("modalPopup")
                    },
                },

                new WebAction(){
                    DelaySeconds = 1,
                    Props=new ElementProps(){
                        ClassItem=new ClassProps("ms-options-wrap",0)
                    },
                    Click = true
                },

                new WebAction(){
                    DelaySeconds  =1,
                    Props=new ElementProps(){
                        Name = "Caliber",
                        Actions = new List<WebAction>(){
                            new WebAction(){
                                Props = new ElementProps(){
                                    TagItem = new TagProps("input", value: "474")
                                },
                                Click = true
                            }
                        }
                    },
                },

                new WebAction(){
                    DelaySeconds = 1,
                    Props=new ElementProps("ctl00_ContentPlaceHolder1_btnQuickSearch"),
                    Click = true
                },
                new WebAction(){
                    DelaySeconds = 1,
                    Props=new ElementProps("txtCaseNumber"){
                        IFrameID = "GCTIFrame",
                        Value = "test selenium"
                    },
                },
                new WebAction(){
                    DelaySeconds = 1,
                    Props=new ElementProps("btnContinue"){
                        IFrameID = "GCTIFrame"
                    },
                    Click = true
                },

                new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.Wait){
                    DelaySeconds = 3,
                    Props=new ElementProps(){
                        Displayed = false,
                        ClassItem = new ClassProps("modalPopup")
                    },
                },

                new WebAction(){
                    DelaySeconds = 1,
                    Props = new ElementProps(){
                        ParentID = "tdControlButton",
                        TagItem=new TagProps("input",value: "Wait")
                    },
                    Click = true
                },
                 new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.Wait){
                    DelaySeconds = 1,
                    Props=new ElementProps(){
                        Displayed = false,
                        ClassItem = new ClassProps("modalPopup")
                    },
                },

                new WebAction(){
                    DelaySeconds = 1,
                    Props=new ElementProps(){
                        ParentID = "tdControlButton",
                        TagItem=new TagProps("input",value: "OK")
                    },
                    Click = true
                },

                new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.ScreenShot){
                    DelaySeconds = 3,
                    FileName = "Step7.SearchPotentialLink",
                },

                 new WebAction(){DelaySeconds = 5},
            };

            sections.Add(searchPL);

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