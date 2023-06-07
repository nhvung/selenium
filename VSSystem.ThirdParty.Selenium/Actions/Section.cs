using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using OpenQA.Selenium;

namespace VSSystem.ThirdParty.Selenium.Actions
{
    [Newtonsoft.Json.JsonObject(ItemNullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
    public class Section : AAction
    {
        List<IAction> _Actions;
        public List<IAction> Actions { get { return _Actions; } set { _Actions = value; } }
        List<IAction> _WaitingActions;
        public List<IAction> WaitingActions { get { return _WaitingActions; } set { _WaitingActions = value; } }
        List<IAction> _ValidateActions;
        public List<IAction> ValidateActions { get { return _ValidateActions; } set { _ValidateActions = value; } }
        bool _IsCorrect;
        [Newtonsoft.Json.JsonIgnore]
        public bool IsCorrect { get { return _IsCorrect; } }
        protected Action<string, bool> _debugLog;
        ScreenShotAction _ScreenShot;
        public ScreenShotAction ScreenShot { get { return _ScreenShot; } set { _ScreenShot = value; } }
        public Section() : base()
        {
            _Actions = null;
            _WaitingActions = null;
            _ValidateActions = null;
            _ScreenShot = null;
        }
        public Section(string name, double? delaySeconds = null) : base(name, delaySeconds)
        {
            _Actions = null;
            _ValidateActions = null;
            _WaitingActions = null;
            _ScreenShot = null;
        }
        public override bool Execute(IWebDriver driver, Action<string> debugLogAction, Action<Exception> errorLogAction)
        {
            try
            {
                if (_Actions?.Count > 0)
                {
                    foreach (var actionObj in _Actions)
                    {
                        actionObj.Execute(driver, debugLogAction, errorLogAction);
                    }
                }
                if (_WaitingActions?.Count > 0)
                {
                    foreach (var actionObj in _WaitingActions)
                    {
                        actionObj.Execute(driver, debugLogAction, errorLogAction);
                    }
                }
                bool isCorrect = true;
                if (_ValidateActions?.Count > 0)
                {
                    foreach (var actionObj in _ValidateActions)
                    {
                        bool isValid = actionObj.Execute(driver, debugLogAction, errorLogAction);
                        if (!isValid)
                        {
                            isCorrect = false;
                            break;
                        }
                    }
                }

                if (_ScreenShot != null)
                {
                    _ScreenShot.Execute(driver, debugLogAction, errorLogAction);
                }
                _IsCorrect = isCorrect;
                _debugLog?.Invoke(_Name, isCorrect);
            }
            catch (Exception ex)
            {
                errorLogAction?.Invoke(new Exception("Execute exception.", ex));
            }
            return true;
        }
    }
}