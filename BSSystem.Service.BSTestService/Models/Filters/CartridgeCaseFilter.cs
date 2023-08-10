namespace BSSystem.Service.BSTestService.Models.Filters
{
    [Newtonsoft.Json.JsonObject(ItemNullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
    public class CartridgeCaseFilter
    {
        string _Obj_ID;
        public string Obj_ID { get { return _Obj_ID; } set { _Obj_ID = value; } }
        string _CaseIncident;
        public string CaseIncident { get { return _CaseIncident; } set { _CaseIncident = value; } }
        string _CartridgeCaseNumber;
        public string CartridgeCaseNumber { get { return _CartridgeCaseNumber; } set { _CartridgeCaseNumber = value; } }
        string _RowIndex;
        public string RowIndex { get { return _RowIndex; } set { _RowIndex = value; } }
    }
}