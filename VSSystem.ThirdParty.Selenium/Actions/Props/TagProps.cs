using System.Collections.Generic;

namespace VSSystem.ThirdParty.Selenium.Actions
{
    [Newtonsoft.Json.JsonObject(ItemNullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
    public class TagProps
    {
        string _TagName;
        public string TagName { get { return _TagName; } set { _TagName = value; } }
        int? _Index;
        public int? Index { get { return _Index; } set { _Index = value; } }
        string _Value;
        public string Value { get { return _Value; } set { _Value = value; } }
        string _Text;
        public string Text { get { return _Text; } set { _Text = value; } }
        List<AttributeProps> _Attributes;
        public List<AttributeProps> Attributes { get { return _Attributes; } set { _Attributes = value; } }
        public TagProps() { }
        public TagProps(string tagName, int? index = null)
        {
            _TagName = tagName;
            _Index = index;
            _Attributes = null;
        }
        public TagProps(string tagName, string value = null, string text = null, int? index = null)
        {
            _TagName = tagName;
            _Value = value;
            _Text = text;
            _Index = index;
            _Attributes = null;
        }
    }

}