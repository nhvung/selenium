using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using VSSystem.ThirdParty.Selenium.Extensions;

namespace VSSystem.ThirdParty.Selenium.Actions
{
    [Newtonsoft.Json.JsonObject(ItemNullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
    public class AttributeProps
    {
        public class JsonField
        {
            string _Name;
            public string Name { get { return _Name; } set { _Name = value; } }
            string _Value;
            public string Value { get { return _Value; } set { _Value = value; } }
            public JsonField() { }
            public JsonField(string name, string value)
            {
                _Name = name;
                _Value = value;
            }
        }
        string _Name;
        public string Name { get { return _Name; } set { _Name = value; } }
        string _Value;
        public string Value { get { return _Value; } set { _Value = value; } }
        string _ContentType;
        public string ContentType { get { return _ContentType; } set { _ContentType = value; } }
        string _CompareType;
        public string CompareType { get { return _CompareType; } set { _CompareType = value; } }
        List<JsonField> _JsonFields;
        public List<JsonField> JsonFields { get { return _JsonFields; } set { _JsonFields = value; } }
        public AttributeProps()
        {

        }
        public AttributeProps(string name, Func<string, bool> validPredicate = default)
        {
            _Name = name;
            _ContentType = "text/html";
        }
        public AttributeProps(string name, string value)
        {
            _Name = name;
            _Value = value;
            _ContentType = "text/html";
        }

        public bool ValidPredicate(string objectValue)
        {
            if (!string.IsNullOrWhiteSpace(objectValue))
            {
                if (!string.IsNullOrWhiteSpace(_ContentType))
                {
                    bool result = true;
                    if (_ContentType.Equals("application/json", StringComparison.InvariantCultureIgnoreCase))
                    {
                        var hsObj = JsonExtension.ConvertJson(objectValue);
                        if (hsObj?.Count > 0 && _JsonFields?.Count > 0)
                        {

                            foreach (var field in _JsonFields)
                            {
                                string fVal = JsonExtension.GetValue(hsObj, field.Name)?.ToString() ?? "";
                                if (!fVal.Equals(field.Value, StringComparison.InvariantCultureIgnoreCase))
                                {
                                    result = false;
                                    break;
                                }
                            }
                        }
                    }
                    else
                    {
                        result = objectValue.Equals(_Value, StringComparison.InvariantCultureIgnoreCase);
                    }
                    return result;
                }
            }

            return false;
        }

    }
}