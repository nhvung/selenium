using System.Threading.Tasks;

namespace testselenium
{
    class Program
    {
        async static Task Main(string[] args)
        {
            var client = new VSSystem.ThirdParty.Selenium.Client();
            await client.ExecuteAsync(new VSSystem.ThirdParty.Selenium.Actions.ActionCollection()
            {

                IsIncognito = true,
                Browser = VSSystem.ThirdParty.Selenium.Define.EBrowser.Chrome,

                Actions = new System.Collections.Generic.List<VSSystem.ThirdParty.Selenium.Actions.IAction>()
                {
                    new VSSystem.ThirdParty.Selenium.Actions.Section(){
                        Name = "Test login",
                        RequestActions = new System.Collections.Generic.List<VSSystem.ThirdParty.Selenium.Actions.IAction>(){
                    new VSSystem.ThirdParty.Selenium.Actions.UrlAction("https://14.161.7.248:4431/ballisticsearch"),
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
                    new VSSystem.ThirdParty.Selenium.Actions.UrlAction("https://14.161.7.248:4431/ballisticsearch/GUI/Home.aspx")
                    {
                        DelaySeconds = 5
                    },
                    new VSSystem.ThirdParty.Selenium.Actions.ElementAction() {
                        ID="dvBallistics",
                        Click = true
                    },
                        }

                    },

                }
            });
        }
    }
}