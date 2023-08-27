using System.Collections.Generic;

namespace VSSystem.ThirdParty.Selenium.Actions
{
    [Newtonsoft.Json.JsonObject(ItemNullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
    public class ClassProps
    {
        string _ClassName;
        public string ClassName { get { return _ClassName; } set { _ClassName = value; } }
        int? _Index;
        public int? Index { get { return _Index; } set { _Index = value; } }
        string _Value;
        public string Value { get { return _Value; } set { _Value = value; } }
        string _Text;
        public string Text { get { return _Text; } set { _Text = value; } }
        List<AttributeProps> _Attributes;
        public List<AttributeProps> Attributes { get { return _Attributes; } set { _Attributes = value; } }
        public ClassProps() { }
        public ClassProps(string className)
        {
            _ClassName = className;
        }
        public ClassProps(string className, int? index)
        {
            _ClassName = className;
            _Index = index;
        }
        public ClassProps(string className, string value = null, string text = null)
        {
            _ClassName = className;
            _Value = value;
            _Text = text;
        }
    }

}