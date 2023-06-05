using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using OpenQA.Selenium;

namespace VSSystem.ThirdParty.Selenium.Actions
{
    [Newtonsoft.Json.JsonObject(ItemNullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
    public class Section : IAction
    {
        string _Name;
        public string Name { get { return _Name; } set { _Name = value; } }
        List<IAction> _RequestActions;
        public List<IAction> RequestActions { get { return _RequestActions; } set { _RequestActions = value; } }
        List<IWaitingAction> _WaitingActions;
        public List<IWaitingAction> WaitingActions { get { return _WaitingActions; } set { _WaitingActions = value; } }
        List<IValidateAction> _ValidateActions;
        public List<IValidateAction> ValidateActions { get { return _ValidateActions; } set { _ValidateActions = value; } }
        bool _IsCorrect;
        [Newtonsoft.Json.JsonIgnore]
        public bool IsCorrect { get { return _IsCorrect; } }
        protected Action<string> _debugLog;
        ScreenShotAction _ScreenShot;
        public ScreenShotAction ScreenShot { get { return _ScreenShot; } set { _ScreenShot = value; } }
        public Section(string name, Action<string> debugLog = default)
        {
            _Name = name;
            _RequestActions = null;
            _ValidateActions = null;
            _WaitingActions = null;
            _debugLog = debugLog;
            _ScreenShot = null;
        }
        public Section()
        {
            _Name = null;
            _RequestActions = null;
            _WaitingActions = null;
            _ValidateActions = null;
            _ScreenShot = null;
        }
        public void Execute(IWebDriver driver)
        {
            try
            {
                if (_RequestActions?.Count > 0)
                {
                    foreach (var actionObj in _RequestActions)
                    {

                        actionObj.Execute(driver);
                    }
                }
                if (_WaitingActions?.Count > 0)
                {
                    foreach (var actionObj in _WaitingActions)
                    {
                        actionObj.Wait(driver);
                    }
                }
                bool isCorrect = true;
                if (_ValidateActions?.Count > 0)
                {
                    foreach (var actionObj in _ValidateActions)
                    {
                        bool isValid = actionObj.IsCorrect(driver);
                        if (!isValid)
                        {
                            isCorrect = false;
                            break;
                        }
                    }
                }

                if (_ScreenShot != null)
                {
                    _ScreenShot.Execute(driver);
                }
                _IsCorrect = isCorrect;
                _debugLog?.Invoke(_Name);
            }
            catch (Exception ex)
            {

            }
        }
    }
}