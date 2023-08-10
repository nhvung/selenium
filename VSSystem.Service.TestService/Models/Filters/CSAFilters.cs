using System.Collections.Generic;

namespace VSSystem.Service.TestService.Models.Filters
{
    [Newtonsoft.Json.JsonObject(ItemNullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
    public class CSAFilters
    {
        string _NumberOfSelectedLastCartridgeCases;
        public string NumberOfSelectedLastCartridgeCases { get { return _NumberOfSelectedLastCartridgeCases; } set { _NumberOfSelectedLastCartridgeCases = value; } }
        List<CartridgeCaseFilter> _CartridgeCases;
        public List<CartridgeCaseFilter> CartridgeCases { get { return _CartridgeCases; } set { _CartridgeCases = value; } }
        string _EngineVersion;
        public string EngineVersion { get { return _EngineVersion; } set { _EngineVersion = value; } }
    }
}