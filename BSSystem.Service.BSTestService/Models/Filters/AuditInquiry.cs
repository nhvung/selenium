namespace BSSystem.Service.BSTestService.Models.Filters
{
    [Newtonsoft.Json.JsonObject(ItemNullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
    public class AuditInquiry
    {
        string _CaseNumber;
        public string CaseNumber { get { return _CaseNumber; } set { _CaseNumber = value; } }
        string _AuthorizedPurpose;
        public string AuthorizedPurpose { get { return _AuthorizedPurpose; } set { _AuthorizedPurpose = value; } }
    }
}