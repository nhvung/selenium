using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using VSSystem.ThirdParty.Microsoft.Skype;
using VSSystem.ThirdParty.Microsoft.Skype.Models.Message;

namespace BSSystem.Service.BSTestService.Extensions
{
    class SkypeExtension
    {
        public static SkypeClient Client = null;
        static public void Login(string credentialFilePath, string signinName, string password)
        {
            try
            {
                Client = new SkypeClient(credentialFilePath, signinName, password);
#if DEBUG
                var groupChats = Client.GetGroupChatsAsync().Result;
#endif


            }
            catch { }
        }
        static public Task SendPrivateMessageAsync(string skypeId, string message, CancellationToken cancellationToken = default)
        {
            return Client?.SendPrivateMessageAsync(skypeId, message, cancellationToken);
        }

    }
}