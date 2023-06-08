using System;
using OpenQA.Selenium;
using VSSystem.ThirdParty.Selenium.Define;

namespace VSSystem.ThirdParty.Selenium.Actions
{
    [Newtonsoft.Json.JsonObject(ItemNullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
    public abstract class AAction : IAction
    {
        protected string _Name;
        public string Name { get { return _Name; } set { _Name = value; } }
        protected double? _DelaySeconds;
        public double? DelaySeconds { get { return _DelaySeconds; } set { _DelaySeconds = value; } }
        protected string _Type;
        public string Type { get { return _Type; } set { _Type = value; } }
        public EActionType EType
        {
            get
            {
                EActionType result = EActionType.Undefine;
                if (!string.IsNullOrWhiteSpace(_Type))
                {
                    Enum.TryParse(_Type, true, out result);
                }
                return result;
            }
        }
        public abstract bool Execute(IWebDriver driver, Action<string> debugLogAction = null, Action<Exception> errorLogAction = null);

        protected AAction() { _Type = EActionType.Undefine.ToString(); }
        protected AAction(string name, double? delaySeconds = null)
        {
            _Type = EActionType.Undefine.ToString();
            _Name = name;
            _DelaySeconds = delaySeconds;
        }
    }
}