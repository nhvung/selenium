using System;
using System.Threading.Tasks;

namespace testselenium
{
    class Program
    {
        async static Task Main(string[] args)
        {
            string checkUrl = $"https://14.161.7.248:4431/ballisticsearch";
            var client = new VSSystem.ThirdParty.Selenium.Client();
            await client.ExecuteAsync(new VSSystem.ThirdParty.Selenium.Actions.ActionTask()
            {

                IsIncognito = true,
                Browser = VSSystem.ThirdParty.Selenium.Define.EBrowser.Chrome,

                Sections = new System.Collections.Generic.List<VSSystem.ThirdParty.Selenium.Actions.Section>()
                {
                    new VSSystem.ThirdParty.Selenium.Actions.Section("TEST LOGIN"){

                        RequestActions = new System.Collections.Generic.List<VSSystem.ThirdParty.Selenium.Actions.IAction>(){
                            new VSSystem.ThirdParty.Selenium.Actions.NavigateAction(checkUrl),
                            new VSSystem.ThirdParty.Selenium.Actions.ElementAction() {
                                ID="txtUserName",
                                Value = "ex_vung"
                            },
                            new VSSystem.ThirdParty.Selenium.Actions.ElementAction() {
                                ID="txtPassword",
                                Value = "Evidence9!"
                            },
                            new VSSystem.ThirdParty.Selenium.Actions.ElementAction() {
                                ID="btnOk",
                                Click = true
                            },
                            new VSSystem.ThirdParty.Selenium.Actions.NavigateAction($"{checkUrl}/GUI/Home.aspx")
                            {
                                //DelaySeconds = 5
                            },

                        },
                        ValidateActions = new System.Collections.Generic.List<VSSystem.ThirdParty.Selenium.Actions.IValidateAction>()
                        {
new VSSystem.ThirdParty.Selenium.Actions.ElementValidateAction()
{
    ID="ctl00_ContentPlaceHolder1_dvUserManagement",
    DelaySeconds = 3
}
                        },
                        OnCorrect = (name)=> {
                            Console.WriteLine($"{name} is correct.");
                        },
                        OnFailed = (name)=> {
                            Console.WriteLine($"{name} is failed.");
                        },
                    },

                }
            });
        }
    }
}