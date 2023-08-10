using System.Collections.Generic;
using System.IO;
using BSSystem.Service.BSTestService.Models;
using Newtonsoft.Json;

namespace BSSystem.Service.BSTestService.Extensions
{
    class AccountExtension
    {
        public static List<AccountInfo> ListAccounts()
        {
            List<AccountInfo> result = new List<AccountInfo>();
            try
            {
                FileInfo accountFile = new FileInfo($"{VSSystem.GlobalVariables.WorkingFolder.FullName}/accounts.json");
                if (accountFile.Exists)
                {
                    string jsonRequest = File.ReadAllText(accountFile.FullName, System.Text.Encoding.UTF8);
                    result = JsonConvert.DeserializeObject<List<AccountInfo>>(jsonRequest);
                }
            }
            catch { }
            return result;
        }
    }
}