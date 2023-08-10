using System.Collections.Generic;

namespace VSSystem.Service.TestService.Models.Filters
{
    [Newtonsoft.Json.JsonObject(ItemNullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
    public class Search1NFilters
    {
        string _Caliber;
        public string Caliber { get { return _Caliber; } set { _Caliber = value; } }
        string _CaseIncidents;
        public string CaseIncidents { get { return _CaseIncidents; } set { _CaseIncidents = value; } }
        string _Score;
        public string Score { get { return _Score; } set { _Score = value; } }
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

        #region box-2: Location Filter
        string _LocationOfIncident;
        public string LocationOfIncident { get { return _LocationOfIncident; } set { _LocationOfIncident = value; } }
        string _Radius;
        public string Radius { get { return _Radius; } set { _Radius = value; } }
        #endregion

        #region box-3: Data Filters
        string _NumberOfCandidates;
        public string NumberOfCandidates { get { return _NumberOfCandidates; } set { _NumberOfCandidates = value; } }
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
        string _ResultSameCaseIncident;
        public string ResultSameCaseIncident { get { return _ResultSameCaseIncident; } set { _ResultSameCaseIncident = value; } }
        bool? _ResultIncludeTestFired;
        public bool? ResultIncludeTestFired { get { return _ResultIncludeTestFired; } set { _ResultIncludeTestFired = value; } }
    }
}