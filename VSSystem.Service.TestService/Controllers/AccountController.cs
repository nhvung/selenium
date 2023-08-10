using System;
using System.Linq;
using System.Threading.Tasks;
using VSSystem.Service.TestService.Extensions;
using VSSystem.Service.TestService.Models;
using VSSystem.Service.TestService.Request;
using VSSystem.Collections.Generic.Extensions;
using VSSystem.Extensions.Hosting.Controllers;
using VSSystem.Extensions.Hosting.Models;

namespace VSSystem.Service.TestService.Controllers
{
    public class AccountController : AController
    {
        public AccountController() : base("AccountController", BSHost.SERVICE_NAME, BSHost.StaticLogger, BSHost.PRIVATE_KEY)
        {
        }
        protected override Task _ProcessApiContext(string path, string queryString)
        {
            try
            {
                if (path.Equals($"{_ServicePath}api/account/gettoken/", StringComparison.InvariantCultureIgnoreCase))
                {
                    return GetToken(path, queryString);
                }
            }
            catch (Exception ex)
            {
                this.LogError(ex);
            }
            return base._ProcessApiContext(path, queryString);
        }
        async Task GetToken(string path, string queryString)
        {
            try
            {
                var loginRequestObj = await this.GetRequestObject<GetTokenRequest>(System.Text.Encoding.UTF8);
                if (loginRequestObj != null)
                {
                    var accountObjs = AccountExtension.ListAccounts();
                    if (accountObjs?.Count > 0)
                    {
                        string sha512Password = loginRequestObj.Sha512Password;
                        if (string.IsNullOrWhiteSpace(sha512Password))
                        {
                            if (!string.IsNullOrWhiteSpace(loginRequestObj.ClearPassword))
                            {
                                sha512Password = VSSystem.Security.Cryptography.Hash(loginRequestObj.ClearPassword, VSSystem.Security.HashAlgName.SHA512);
                            }
                        }
                        var accountObj = accountObjs.FirstOrDefault(ite => ite.Username.Equals(loginRequestObj.Username, StringComparison.InvariantCultureIgnoreCase)
                        && ite.Sha512Password.Equals(sha512Password, StringComparison.InvariantCultureIgnoreCase));
                        if (accountObj != null)
                        {
                            await this.ResponseJsonAsync(new
                            {
                                accountObj.Name,
                                accountObj.Email,
                                accountObj.SkypeId,
                            }, System.Net.HttpStatusCode.OK);
                        }
                    }
                }

                await this.ResponseJsonAsync(DefaultResponse.NoPermission, System.Net.HttpStatusCode.Unauthorized);
            }
            catch (Exception ex)
            {
                this.LogError(ex);
            }
        }
    }
}