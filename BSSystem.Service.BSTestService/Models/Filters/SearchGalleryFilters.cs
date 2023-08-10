using System.Collections.Generic;

namespace BSSystem.Service.BSTestService.Models.Filters
{
    [Newtonsoft.Json.JsonObject(ItemNullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
    public class SearchGalleryFilters
    {
        #region box-1
        string _CaseIncidents;
        public string CaseIncidents { get { return _CaseIncidents; } set { _CaseIncidents = value; } }
        string _Category;
        public string Category { get { return _Category; } set { _Category = value; } }
        string _DateOfIncidentFrom;
        public string DateOfIncidentFrom { get { return _DateOfIncidentFrom; } set { _DateOfIncidentFrom = value; } }
        string _DateOfIncidentTo;
        public string DateOfIncidentTo { get { return _DateOfIncidentTo; } set { _DateOfIncidentTo = value; } }
        string _ScanDateFrom;
        public string ScanDateFrom { get { return _ScanDateFrom; } set { _ScanDateFrom = value; } }
        string _ScanDateTo;
        public string ScanDateTo { get { return _ScanDateTo; } set { _ScanDateTo = value; } }
        string _Caliber;
        public string Caliber { get { return _Caliber; } set { _Caliber = value; } }
        string _BreechFaceCharacteristics;
        public string BreechFaceCharacteristics { get { return _BreechFaceCharacteristics; } set { _BreechFaceCharacteristics = value; } }
        string _FiringPinShape;
        public string FiringPinShape { get { return _FiringPinShape; } set { _FiringPinShape = value; } }
        string _FirearmType;
        public string FirearmType { get { return _FirearmType; } set { _FirearmType = value; } }
        string _Make;
        public string Make { get { return _Make; } set { _Make = value; } }
        string _Model;
        public string Model { get { return _Model; } set { _Model = value; } }
        #endregion

        #region box-2: Location Filter
        string _LocationOfIncident;
        public string LocationOfIncident { get { return _LocationOfIncident; } set { _LocationOfIncident = value; } }
        string _Radius;
        public string Radius { get { return _Radius; } set { _Radius = value; } }
        #endregion

        #region box-3: Data Filters
        string _Agency;
        public string Agency { get { return _Agency; } set { _Agency = value; } }
        List<string> _SharedAgencies;
        public List<string> SharedAgencies { get { return _SharedAgencies; } set { _SharedAgencies = value; } }
        string _AgencyUsers;
        public string AgencyUsers { get { return _AgencyUsers; } set { _AgencyUsers = value; } }
        List<string> _States;
        public List<string> States { get { return _States; } set { _States = value; } }
        List<string> _Counties;
        public List<string> Counties { get { return _Counties; } set { _Counties = value; } }
        #endregion
    }
}