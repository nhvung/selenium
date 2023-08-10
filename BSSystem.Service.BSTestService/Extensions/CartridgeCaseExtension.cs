using BSSystem.Service.BSTestService.Models.Web.Gallery;
using Newtonsoft.Json;

namespace BSSystem.Service.BSTestService.Extensions
{
    class CartridgeCaseExtension
    {
        public static bool CatridgeCaseIdentifyPredicate(string jsonInfo, string caseIncident, string cartridgeNumber)
        {
            try
            {
                var ccInfo = JsonConvert.DeserializeObject<CCJsonInfo>(jsonInfo);
                if (ccInfo != null)
                {
                    bool result = (ccInfo.CaseNumber?.Equals(caseIncident, System.StringComparison.InvariantCultureIgnoreCase) ?? false)
                    && (ccInfo.CasingNumber?.Equals(cartridgeNumber, System.StringComparison.InvariantCultureIgnoreCase) ?? false);
                    return result;
                }

            }
            catch { }
            return false;
        }
    }
}