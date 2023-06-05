namespace VSSystem.ThirdParty.Selenium.Actions
{
    public class ClassItem
    {
        string _ClassName;
        public string ClassName { get { return _ClassName; } set { _ClassName = value; } }
        int? _Index;
        public int? Index { get { return _Index; } set { _Index = value; } }
        string _Value;
        public string Value { get { return _Value; } set { _Value = value; } }
        string _Text;
        public string Text { get { return _Text; } set { _Text = value; } }
        public ClassItem() { }
        public ClassItem(string className, int? index)
        {
            _ClassName = className;
            _Index = index;
        }
    }

}