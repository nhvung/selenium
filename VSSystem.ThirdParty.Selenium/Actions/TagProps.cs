namespace VSSystem.ThirdParty.Selenium.Actions
{
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
        public TagProps() { }
        public TagProps(string tagName, int? index)
        {
            _TagName = tagName;
            _Index = index;
        }
        public TagProps(string tagName, string value = "", string text = "")
        {
            _TagName = tagName;
            _Value = value;
            _Text = text;
        }
    }

}