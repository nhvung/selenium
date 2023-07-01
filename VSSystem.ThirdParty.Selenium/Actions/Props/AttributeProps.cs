using System;
namespace VSSystem.ThirdParty.Selenium.Actions
{
    [Newtonsoft.Json.JsonObject(ItemNullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
    public class AttributeProps
    {
        string _Name;
        public string Name { get { return _Name; } set { _Name = value; } }
        Func<string, bool> _IsValid;
        public Func<string, bool> IsValid { get { return _IsValid; } set { _IsValid = value; } }
    }
}