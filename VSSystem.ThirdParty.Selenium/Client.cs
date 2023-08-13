using System;
using System.IO;
using Newtonsoft.Json;
using VSSystem.ThirdParty.Selenium.Actions;
using VSSystem.ThirdParty.Selenium.Extensions;
using VSSystem.ThirdParty.Selenium.Models;

namespace VSSystem.ThirdParty.Selenium
{
    public class Client
    {
        public bool Execute(Actions.ActionTask actionTask, string driverFolderPath = "", Action onFinishAction = default, Action<string> debugLogAction = default, Action<Exception> errorLogAction = default)
        {
            return Execute(new ActionTask[] { actionTask }, driverFolderPath, onFinishAction, debugLogAction, errorLogAction);
        }
        public bool Execute(Actions.ActionTask[] actionTasks, string driverFolderPath = "", Action onFinishAction = default, Action<string> debugLogAction = default, Action<Exception> errorLogAction = default)
        {
            bool result = true;
            try
            {

                if (actionTasks?.Length > 0)
                {
                    foreach (var actionTask in actionTasks)
                    {
                        using (var driver = DriverExtension.CreateDriver(actionTask.EBrowser, actionTask.IsIncognito, actionTask.IsHeadless, driverFolderPath))
                        {
                            if (driver != null)
                            {
                                Resolution resolutionObj;
                                Resolution.TryParse(actionTask.Resolution, out resolutionObj);
                                if (resolutionObj == null)
                                {
                                    resolutionObj = Resolution.Default;
                                }
                                if (actionTask.IsHeadless)
                                {
                                    driver.Manage().Window.Size = resolutionObj.ToSize();
                                }
                                else
                                {
                                    driver.Manage().Window.Maximize();
                                }


                                if (actionTask.Sections?.Count > 0)
                                {
                                    foreach (var section in actionTask.Sections)
                                    {
                                        var sectionResult = section.Execute(driver, debugLogAction, errorLogAction);
                                        if (!sectionResult)
                                        {
                                            result = false;
                                            break;
                                        }
                                    }
                                }
                                try
                                {
                                    driver.Close();
                                    driver.Quit();
                                }
                                catch { }

#if DEBUG
                                try
                                {
                                    var jsonTaskObj = JsonConvert.SerializeObject(actionTask, Formatting.Indented);

                                    string fileName = string.Join("_", actionTask.Name.Split(Path.GetInvalidFileNameChars()));
                                    if (string.IsNullOrWhiteSpace(fileName))
                                    {
                                        fileName = Guid.NewGuid().ToString().ToLower();
                                    }
                                    var taskFile = new FileInfo($"{Directory.GetCurrentDirectory()}/tasks/{fileName}.json");
                                    if (!taskFile.Directory.Exists)
                                    {
                                        taskFile.Directory.Create();
                                    }
                                    File.WriteAllText(taskFile.FullName, jsonTaskObj);
                                }
                                catch (Exception ex)
                                {
                                    errorLogAction?.Invoke(ex);
                                }
#endif

                            }
                        }

                    }
                }
            }
            catch { }
            try
            {
                onFinishAction?.Invoke();
            }
            catch { }
            return result;
        }

        public bool Execute(string fileName, string driverFolderPath = "", System.Action onFinishAction = default, Action<string> debugLogAction = default, Action<Exception> errorLogAction = default)
        {
            try
            {
                var json = System.IO.File.ReadAllText(fileName, System.Text.Encoding.UTF8);
                var taskObj = JsonConvert.DeserializeObject<VSSystem.ThirdParty.Selenium.Actions.ActionTask>(json);
                if (taskObj != null)
                {
                    return Execute(taskObj, driverFolderPath, onFinishAction, debugLogAction, errorLogAction);
                }

            }
            catch (Exception ex)
            {
                errorLogAction?.Invoke(ex);
            }
            return false;
        }
    }


}