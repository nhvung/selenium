using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace testselenium
{
    class Program
    {
        static Dictionary<string, bool> _validateResult;
        async static Task Main(string[] args)
        {
            _validateResult = new Dictionary<string, bool>(StringComparer.InvariantCultureIgnoreCase);
            string checkUrl = $"https://14.161.7.248:4431/ballisticsearch";
            var client = new VSSystem.ThirdParty.Selenium.Client();

            var sections = new System.Collections.Generic.List<VSSystem.ThirdParty.Selenium.Actions.Section>()
                {
                    new VSSystem.ThirdParty.Selenium.Actions.Section("test login", name=> Console.WriteLine($"{name} is correct.")){

                        RequestActions = new System.Collections.Generic.List<VSSystem.ThirdParty.Selenium.Actions.IAction>(){
                            new VSSystem.ThirdParty.Selenium.Actions.NavigateAction(checkUrl),
                            new VSSystem.ThirdParty.Selenium.Actions.ElementAction() {
                                Props=new VSSystem.ThirdParty.Selenium.Actions.ElementProps(){
ID="txtUserName",
                                Value = "ex_vung"
                                }

                            },
                            new VSSystem.ThirdParty.Selenium.Actions.ElementAction() {
                                Props=new VSSystem.ThirdParty.Selenium.Actions.ElementProps(){
ID="txtPassword",
                                Value = "Evidence9!"
                                }

                            },
                            new VSSystem.ThirdParty.Selenium.Actions.ElementAction() {
                                Props=new VSSystem.ThirdParty.Selenium.Actions.ElementProps(){
 ID="btnOk",

                                },
                                Click = true

                            },
                            new VSSystem.ThirdParty.Selenium.Actions.NavigateAction($"{checkUrl}/GUI/Home.aspx")
                            {
                                //DelaySeconds = 5
                            },
                            new VSSystem.ThirdParty.Selenium.Actions.ElementAction(){
                                Props=new VSSystem.ThirdParty.Selenium.Actions.ElementProps()
                                {
                                Type = "select",
                                ID="ctl00_AgencySelectionControl_cboAgencySelection",
                                Text="Agency Enable VCC"
                                },
                                DelaySeconds = 5

                            },
                            new VSSystem.ThirdParty.Selenium.Actions.SnapshotAction(){
                                DelaySeconds = 1,
                                FileName = "login-success"
                            }
                        },

                    },
                    // new VSSystem.ThirdParty.Selenium.Actions.Section("test view gallery", name=> Console.WriteLine($"{name} is correct.")){

                    //     RequestActions = new System.Collections.Generic.List<VSSystem.ThirdParty.Selenium.Actions.IAction>(){
                    //        new VSSystem.ThirdParty.Selenium.Actions.ElementAction()
                    //         {
                    //             ID="dvBallistics",
                    //             Click=true
                    //         },
                    //         new VSSystem.ThirdParty.Selenium.Actions.ElementAction()
                    //         {
                    //             ClassItem=new VSSystem.ThirdParty.Selenium.Actions.ClassItem(){
                    //                 ClassName = "icon_function",
                    //                 Index = 2
                    //             },
                    //             DelaySeconds = 1,
                    //             Click=true
                    //         },
                    //         new VSSystem.ThirdParty.Selenium.Actions.ElementAction(){
                    //             DelaySeconds = 2,
                    //             IFrameID="GCTIFrame",
                    //             ID="btnCancel",
                    //             Click=true
                    //         },

                    //         new VSSystem.ThirdParty.Selenium.Actions.ElementAction(){
                    //             DelaySeconds = 1,
                    //             ID="ctl00_ContentPlaceHolder1_ucNameFilter_txtCaseNumber",
                    //             Value="T"
                    //         },
                    //         new VSSystem.ThirdParty.Selenium.Actions.ElementAction(){
                    //             DelaySeconds = 1,
                    //             // ID="cboSingleCaliber",
                    //             ClassItem=new VSSystem.ThirdParty.Selenium.Actions.ClassItem("ms-options-wrap", 0),
                    //             Click = true
                    //         },
                    //         new VSSystem.ThirdParty.Selenium.Actions.ElementAction(){
                    //             DelaySeconds = 1,
                    //            XPath="//*[@id=\"box-filter\"]/div[1]/div[2]/div/table/tbody/tr[7]/td[2]/div/div/ul/li[1]/ul/li[6]/label",
                    //            Click=true
                    //         },
                    //         new VSSystem.ThirdParty.Selenium.Actions.ElementAction(){
                    //             DelaySeconds = 1,
                    //             Type = "select",
                    //             ID="cboAgencyScope",
                    //             Value="-3"
                    //         },
                    //         new VSSystem.ThirdParty.Selenium.Actions.ElementAction(){
                    //             DelaySeconds = 2,
                    //             ParentID="list-share",
                    //             ID="chk-all-share",
                    //             Checked = false
                    //         },
                    //          new VSSystem.ThirdParty.Selenium.Actions.ElementAction(){
                    //             DelaySeconds = 1,
                    //              ParentID="list-share",
                    //              TagItem=new VSSystem.ThirdParty.Selenium.Actions.TagItem("input", 1),
                    //             Checked = true,
                    //         },
                    //          new VSSystem.ThirdParty.Selenium.Actions.ElementAction(){
                    //             // DelaySeconds = 1,
                    //              ParentID="list-share",
                    //              TagItem=new VSSystem.ThirdParty.Selenium.Actions.TagItem("input", 2),
                    //             Checked = true,
                    //         },
                    //          new VSSystem.ThirdParty.Selenium.Actions.ElementAction(){
                    //             DelaySeconds = 2,
                    //             ID="chk-all-state",
                    //             Checked = false
                    //         },
                    //          new VSSystem.ThirdParty.Selenium.Actions.ElementAction(){
                    //             DelaySeconds = 1,
                    //             ID="state6",
                    //             Checked = true
                    //         },
                    //         new VSSystem.ThirdParty.Selenium.Actions.ElementAction()
                    //         {
                    //             DelaySeconds = 1,
                    //             ClassItem=new VSSystem.ThirdParty.Selenium.Actions.ClassItem(){
                    //                 ClassName = "button100_green",
                    //                 Index = 0
                    //             },
                    //             Click=true
                    //         },
                    //         new VSSystem.ThirdParty.Selenium.Actions.ElementAction(){
                    //             DelaySeconds = 1,
                    //             ID= "txtCaseNumber",
                    //             IFrameID="GCTIFrame",
                    //             Value = "Test Selenium"
                    //         },
                    //         new VSSystem.ThirdParty.Selenium.Actions.ElementAction(){
                    //             IFrameID="GCTIFrame",
                    //             ID="btnContinue",
                    //             Click=true
                    //         },
                    //         new VSSystem.ThirdParty.Selenium.Actions.SnapshotAction(){
                    //             DelaySeconds = 5
                    //         }
                    //     },
                    //     ValidateActions = new System.Collections.Generic.List<VSSystem.ThirdParty.Selenium.Actions.IValidateAction>()
                    //     {
                    //         new VSSystem.ThirdParty.Selenium.Actions.ElementValidateAction(){
                    //             ID = "resultview",
                    //             Displayed = true,
                    //             DelaySeconds = 5
                    //         }
                    //     },
                    // },
                    // new VSSystem.ThirdParty.Selenium.Actions.Section("test csa", name=> Console.WriteLine($"{name} is correct.")){

                    //     RequestActions = new System.Collections.Generic.List<VSSystem.ThirdParty.Selenium.Actions.IAction>(){
                    //         new VSSystem.ThirdParty.Selenium.Actions.ElementAction(){
                    //             DelaySeconds = 5,
                    //             ID="chkSelectAll",
                    //             Click = true
                    //         },
                    //         new VSSystem.ThirdParty.Selenium.Actions.ElementAction(){
                    //             ID="ctl00_ContentPlaceHolder1_btnAnalysisReport",
                    //             Click = true
                    //         },
                    //          new VSSystem.ThirdParty.Selenium.Actions.ElementAction(){
                    //             DelaySeconds = 20,
                    //             SwitchToNewWindow = true,
                    //             TagItem = new VSSystem.ThirdParty.Selenium.Actions.TagItem("button", text: "Wait"),
                    //             Click = true
                    //         },
                    //     },
                    //     WaitingActions = new List<VSSystem.ThirdParty.Selenium.Actions.IValidateAction>(){
                    //         new VSSystem.ThirdParty.Selenium.Actions.ElementWaitingAction(){
                    //             ID = "loading-msg",
                    //             Displayed = false,
                    //             SwitchToNewWindow = true,
                    //             DelaySeconds = 5
                    //         }
                    //     },
                    //     ValidateActions = new System.Collections.Generic.List<VSSystem.ThirdParty.Selenium.Actions.IValidateAction>()
                    //     {
                    //         new VSSystem.ThirdParty.Selenium.Actions.ElementValidateAction(){
                    //             ID = "resultview",
                    //             Displayed = true,
                    //         }
                    //     },
                    // },
                };

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
                Sections = sections
            };

            var taskParams3Obj = new VSSystem.ThirdParty.Selenium.Actions.ActionTask("Test BIQ web edge")
            {
                IsIncognito = true,
                Browser = "edge",
                Sections = sections
            };

            client.Execute(taskParams1Obj
            // , taskParams2Obj
            // , taskParams3Obj
            );

        }
    }
}