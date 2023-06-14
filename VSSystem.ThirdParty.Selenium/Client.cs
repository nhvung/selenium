using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json;
using VSSystem.ThirdParty.Selenium.Actions;
using VSSystem.ThirdParty.Selenium.Extensions;

namespace VSSystem.ThirdParty.Selenium
{
    public class Client
    {
        public void Execute(Actions.ActionTask[] actionTasks, Action<string> debugLogAction = default, Action<Exception> errorLogAction = default)
        {
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
                                driver.Manage().Window.Maximize();

                                if (actionTask.Sections?.Count > 0)
                                {
                                    bool executeResult = true;
                                    foreach (var section in actionTask.Sections)
                                    {
                                        var sectionResult = section.Execute(driver, debugLogAction, errorLogAction);
                                        if (!sectionResult)
                                        {
                                            executeResult = false;
                                        }
                                    }
                                }
#if DEBUG
                                // Thread.Sleep(5000);
#endif

                                driver.Quit();

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
                                catch { }
                            }
                        }

                    }
                }
            }
            catch { }
        }

        public void Execute(string fileName, Action<string> debugLogAction = default, Action<Exception> errorLogAction = default)
        {
            try
            {
                var json = System.IO.File.ReadAllText(fileName, System.Text.Encoding.UTF8);

            }
            catch (Exception ex) { }
        }
    }


}