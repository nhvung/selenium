namespace VSSystem.ThirdParty.Selenium.Actions
{
    public class TagItem
    {
        string _TagName;
        public string TagName { get { return _TagName; } set { _TagName = value; } }
        int? _Index;
        public int? Index { get { return _Index; } set { _Index = value; } }
        string _Value;
        public string Value { get { return _Value; } set { _Value = value; } }
        string _Text;
        public string Text { get { return _Text; } set { _Text = value; } }
        public TagItem() { }
        public TagItem(string tagName, int? index)
        {
            _TagName = tagName;
            _Index = index;
        }
        public TagItem(string tagName, string value = "", string text = "")
        {
            _TagName = tagName;
            _Value = value;
            _Text = text;
        }
    }

}