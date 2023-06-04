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
                Url = "https://14.161.7.248:4431/ballisticsearch",
                IsIncognito = true,
                Browser = VSSystem.ThirdParty.Selenium.Define.EBrowser.Chrome,
                Actions = new System.Collections.Generic.List<VSSystem.ThirdParty.Selenium.Actions.IAction>()
                {
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
                    }
                }
            });
        }
    }
}