using System;
using System.IO;
using Newtonsoft.Json;
using VSSystem.ThirdParty.Selenium.Actions;
using VSSystem.ThirdParty.Selenium.Extensions;

namespace VSSystem.ThirdParty.Selenium
{
    public class Client
    {
        public bool Execute(Actions.ActionTask[] actionTasks, Action<string> debugLogAction = default, Action<Exception> errorLogAction = default)
        {
            bool result = true;
            try
            {
                if (actionTasks?.Length > 0)
                {
                    foreach (var actionTask in actionTasks)
                    {
                        using (var driver = DriverExtension.CreateDriver(actionTask.EBrowser, actionTask.IsIncognito))
                        {
                            if (driver != null)
                            {
                                // driver.Manage().Window.Position = new System.Drawing.Point(2000, 1);
                                driver.Manage().Window.Maximize();

                                if (actionTask.Sections?.Count > 0)
                                {
                                    foreach (var section in actionTask.Sections)
                                    {
                                        var sectionResult = section.Execute(driver, debugLogAction, errorLogAction);
                                        if (!sectionResult)
                                        {
                                            result = false;
                                        }
                                    }
                                }
                                driver.Close();
                                driver.Quit();
                                driver.Dispose();

                                try
                                {
                                    var jsonTaskObj = JsonConvert.SerializeObject(actionTask, Formatting.Indented);
                                    string fileName = actionTask.Name;
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
                            }
                        }

                    }
                }
            }
            catch { }
            return result;
        }

        public void Execute(string fileName, Action<string> debugLogAction = default, Action<Exception> errorLogAction = default)
        {
            try
            {
                var json = System.IO.File.ReadAllText(fileName, System.Text.Encoding.UTF8);
                var taskObj = JsonConvert.DeserializeObject<VSSystem.ThirdParty.Selenium.Actions.ActionTask>(json);
                if (taskObj != null)
                {
                    Execute(new ActionTask[] { taskObj }, debugLogAction, errorLogAction);
                }

            }
            catch (Exception ex)
            {
                errorLogAction?.Invoke(ex);
            }
        }
    }


}