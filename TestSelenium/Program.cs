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
#if PRO 
            string checkUrl = $"https://login.evidenceiq.com/biq";
            string username = "am_checksystem";
            string password = "Evidenceiq1!";
#else
            string checkUrl = $"https://sandbox.evidenceiq.com/biq";
            string username = "leu.vung1";
            string password = "Evidence2!";
#endif


            var client = new VSSystem.ThirdParty.Selenium.Client();

            // try
            // {
            //     client.Execute("./tasks/Test BIQ web firefox.json", errorLogAction: ex =>
            //     {
            //         Console.WriteLine(ex.Message);
            //         Console.WriteLine(ex.StackTrace);
            //         if (ex.InnerException != null)
            //         {
            //             Console.WriteLine(ex.InnerException.Message);
            //             Console.WriteLine(ex.InnerException.StackTrace);
            //         }

            //     });
            //     return;
            // }
            // catch { }

            var sections = new System.Collections.Generic.List<VSSystem.ThirdParty.Selenium.Actions.WebAction>();
            var loginSection = new VSSystem.ThirdParty.Selenium.Actions.WebAction("Test Login");
            loginSection.Actions = new List<VSSystem.ThirdParty.Selenium.Actions.WebAction>(){

                new WebAction(){Url = checkUrl},

                new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.Validate){
                    Title = "EVIDENCE IQ - LOGIN"
                },
                new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.ScreenShot){
                    DelaySeconds = 1,
                    FileName = "Step1.BrowseToBIQ",
                },

                new WebAction{
                    Props=new ElementProps("txtUserName"){
                        Value = username
                    }
                },
                 new WebAction{
                    Props=new ElementProps("txtPassword"){Value=password}
                },
                new WebAction{
                    Props=new ElementProps("btnOk"),
                    Click = true
                },
                new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.ScreenShot){
                    DelaySeconds = 1,
                    FileName = "Step2.LoggedIn",
                }
            };

            sections.Add(loginSection);

            var gotoBIQ = new VSSystem.ThirdParty.Selenium.Actions.WebAction("Go to BIQ");

            gotoBIQ.Actions = new List<VSSystem.ThirdParty.Selenium.Actions.WebAction>(){
                 new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.Validate){
                    Title = "EVIDENCE IQ - home",
                },
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
                    DelaySeconds = 5,
                    Props=new ElementProps("btnCancel"){
                        IFrameID = "GCTIFrame"
                    },
                    Click = true
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
                    Props=new ElementProps("txtCaseNumber") {
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

                new WebAction(){
                    DelaySeconds = 3,
                    Props=new ElementProps(){
                        ParentID = "resultview",
                        ClassItem=new ClassProps("ajxitem", 1)
                    },
                    DoubleClick = true
                },
                new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.ScreenShot){
                    DelaySeconds = 10,
                    Props=new ElementProps{
                        SwitchToNewWindow = true,
                        CloseWindow = true
                    },
                    FileName = "Step6.GalleryDetail",
                },

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

                // new WebAction(){
                //     DelaySeconds = 1,
                //     Props = new ElementProps("ctl00_ContentPlaceHolder1_btnAnalysisReport"),
                //     Click = true
                // },

                // new WebAction(){
                //     DelaySeconds = 5,
                //     Props=new ElementProps{
                //         SwitchToNewWindow = true,
                //         CloseWindow = true
                //     },
                //     Actions = new List<WebAction>(){
                //         new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.Wait){
                //             DelaySeconds = 3,
                //             Props=new ElementProps("loadingUI")
                //             {
                //                 Displayed = false
                //             },
                //         },
                //         new WebAction(){
                //             DelaySeconds = 3,
                //             Props=new ElementProps()
                //             {
                //                 TagItem = new TagProps("button", text: "Wait")
                //             },
                //             Click = true
                //         },
                //         new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.Wait){
                //             DelaySeconds = 5,
                //             Props=new ElementProps("loadingUI")
                //             {
                //                 Displayed = false
                //             }
                //         },
                //         new WebAction(){
                //             DelaySeconds = 1,
                //             ShiftKey = true,
                //             PressKeys = new List<string>(){"f"}
                //         },
                //         new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.ScreenShot){
                //             DelaySeconds = 5,
                //             FileName = "Step7.RunCSA",
                //         },
                //     }
                // },

                // new WebAction(){
                //     DelaySeconds = 1,
                //     Props=new ElementProps("ctl00_ContentPlaceHolder1_btnCompare"),
                //     Click = true,
                // },
                // new WebAction(){
                //     DelaySeconds = 5,
                //     Props=new ElementProps() {
                //         SwitchToNewWindow = true,
                //         CloseWindow = true
                //     },
                //     Actions = new List<WebAction>(){

                //         new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.Wait){
                //             DelaySeconds = 3,
                //             Props=new ElementProps("loadingUI"){
                //                 IFrameID = "Compare2DTool",
                //                 Displayed = false
                //             },
                //         },
                //         new WebAction(){
                //             DelaySeconds= 5,
                //             Props=new ElementProps("btnPatternMatching"){
                //                 IFrameID = "Compare2DTool",
                //                 ParentID = "optioncontroller"
                //             },
                //             Click = true
                //         },
                //         new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.Wait){
                //             DelaySeconds = 3,
                //             Props=new ElementProps("loadingUI"){
                //                 IFrameID = "Compare2DTool",
                //                 Displayed = false
                //             },
                //         },
                //         new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.ScreenShot){
                //             DelaySeconds = 3,
                //             FileName = "Step8.PatternMatching",
                //         },

                //         new WebAction(){
                //             DelaySeconds= 5,
                //             Props=new ElementProps(){
                //                 IFrameID = "Compare2DTool",
                //                 ParentID = "optioncontroller",
                //                 TagItem = new TagProps("span", text: "3d tool")
                //             },
                //             Click = true
                //         },

                //         new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.Wait){
                //             DelaySeconds = 3,
                //             Props=new ElementProps(){
                //                 IFrameID = "Compare3DToolThreeJS",
                //                 ParentID = "imageLeftSlideCtr",
                //                 TagItem = new TagProps("p", text: "Generating..."),
                //                 Displayed = false
                //             },
                //         },
                //          new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.Wait){
                //             DelaySeconds = 3,
                //             Props=new ElementProps(){
                //                 IFrameID = "Compare3DToolThreeJS",
                //                 ParentID = "imageRightSlideCtr",
                //                 TagItem = new TagProps("p", text: "Generating..."),
                //                 Displayed = false
                //             },
                //         },
                //          new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.ScreenShot){
                //             DelaySeconds = 3,
                //             FileName = "Step9.3DTool",
                //         },
                //     }
                // },

                new WebAction(){
                    DelaySeconds = 1,
                    Props = new ElementProps("ctl00_ContentPlaceHolder1_btnSearchFace"),
                    Click = true
                },
                new WebAction("", VSSystem.ThirdParty.Selenium.Define.EActionType.Wait)
                {
                    DelaySeconds = 10,
                    Actions = new List<WebAction>(){
                        new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.Wait)
                        {
                            DelaySeconds = 3,
                            Props = new ElementProps(){
                                ClassItem = new ClassProps("modalPopup"),
                                Displayed = false
                            }
                        },
                        // new WebAction(){
                        //     DelaySeconds = 1,
                        //     Props = new ElementProps(){
                        //         ClassItem = new ClassProps("ms-options-wrap", 0)
                        //     },
                        //     Click = true
                        // },
                        // new WebAction {
                        //     DelaySeconds = 1,
                        //     Props=new ElementProps{
                        //        Name = "Caliber",
                        //         Actions = new List<WebAction>(){
                        //             new WebAction{
                        //                 Props = new ElementProps{
                        //                     TagItem = new TagProps("input", value: "371")
                        //                 },
                        //                 Click = true
                        //             }
                        //         }
                        //     }
                        // },
                        new WebAction{
                            DelaySeconds = 1,
                            Props = new ElementProps("ctl00_ContentPlaceHolder1_cboAgency"){
                                Type = "select",
                                Text = "My Agency"
                            }
                        },
                        new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.Wait)
                        {
                            DelaySeconds = 3,
                            Props = new ElementProps(){
                                ClassItem = new ClassProps("modalPopup"),
                                Displayed = false
                            }
                        },
                        new WebAction{
                            DelaySeconds = 1,
                            Props = new ElementProps("ctl00_ContentPlaceHolder1_chkIncludeTestFired"){
                                Checked = true
                            }
                        },
                        new WebAction{
                            DelaySeconds = 1,
                            Props = new ElementProps("ctl00_ContentPlaceHolder1_btnQuickSearch"),
                            Click = true
                        },
                        new WebAction(){
                            DelaySeconds = 1,
                            Props = new ElementProps("infodiv"){
                                IFrameID = "GCTIFrame",
                                Actions = new List<WebAction>{
                                    new WebAction{
                                        Props = new ElementProps("txtCaseNumber"){
                                            Value = "test selenium"
                                        }
                                    },
                                    new WebAction{
                                        Props = new ElementProps("btnContinue"),
                                        Click=true
                                    }
                                }
                            },
                        },
                        new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.Wait)
                        {
                            DelaySeconds = 3,
                            Props = new ElementProps(){
                                ClassItem = new ClassProps("modalPopup"),
                                Displayed = false
                            }
                        },
                        new WebAction{
                            DelaySeconds = 1,
                            Props = new ElementProps{
                                ParentID = "tdControlButton",
                                TagItem = new TagProps("input", value: "wait")
                            },
                            Click=true
                        },
                         new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.Wait)
                        {
                            DelaySeconds = 3,
                            Props = new ElementProps(){
                                ClassItem = new ClassProps("modalPopup"),
                                Displayed = false
                            }
                        },
                        new WebAction{
                            DelaySeconds = 1,
                            Props = new ElementProps{
                                ParentID = "tdControlButton",
                                TagItem = new TagProps("input", value: "ok")
                            },
                            Click=true
                        },
                        new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.ScreenShot)                        {
                            DelaySeconds = 3,
                            FileName = "Step11.SearchPotentialLink"
                        }
                    }
                },

                new WebAction()
                {
                    DelaySeconds = 10,
                },
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