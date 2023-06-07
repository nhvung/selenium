using System;
using OpenQA.Selenium;

namespace VSSystem.ThirdParty.Selenium.Actions
{
    public abstract class AAction : IAction
    {
        protected string _Name;
        public string Name { get { return _Name; } set { _Name = value; } }
        protected double? _DelaySeconds;
        public double? DelaySeconds { get { return _DelaySeconds; } set { _DelaySeconds = value; } }

        public abstract bool Execute(IWebDriver driver, Action<string> debugLogAction = null, Action<Exception> errorLogAction = null);

        protected AAction() { }
        protected AAction(string name, double? delaySeconds = null)
        {
            _Name = name;
            _DelaySeconds = delaySeconds;
        }
    }
}