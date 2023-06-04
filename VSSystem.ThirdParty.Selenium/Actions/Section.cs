using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using OpenQA.Selenium;

namespace VSSystem.ThirdParty.Selenium.Actions
{
    public class Section : IAction
    {
        string _Name;
        public string Name { get { return _Name; } set { _Name = value; } }
        List<IAction> _RequestActions;
        public List<IAction> RequestActions { get { return _RequestActions; } set { _RequestActions = value; } }
        List<IValidateAction> _ValidateActions;
        public List<IValidateAction> ValidateActions { get { return _ValidateActions; } set { _ValidateActions = value; } }
        public delegate void dlgOnCorrect(string name);
        public delegate void dlgOnFailed(string name);
        public dlgOnCorrect OnCorrect;
        public dlgOnFailed OnFailed;

        public Section(string name)
        {
            _Name = name;
            _RequestActions = null;
            _ValidateActions = null;
        }
        public async Task ExecuteAsync(IWebDriver driver)
        {
            try
            {
                if (_RequestActions?.Count > 0)
                {
                    foreach (var actionObj in _RequestActions)
                    {
                        await actionObj.ExecuteAsync(driver);
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
                if (isCorrect)
                {
                    OnCorrect?.Invoke(_Name);
                }
                else
                {
                    OnFailed?.Invoke(_Name);
                }
            }
            catch (Exception ex)
            {

            }
        }
    }
}