using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using OpenQA.Selenium;

namespace VSSystem.ThirdParty.Selenium.Actions
{
    public class ScreenShotAction : IAction
    {
        int? _DelaySeconds;
        public int? DelaySeconds { get { return _DelaySeconds; } set { _DelaySeconds = value; } }
        string _FolderPath;
        public string FolderPath { get { return _FolderPath; } set { _FolderPath = value; } }
        string _FileName;
        public string FileName { get { return _FileName; } set { _FileName = value; } }
        public bool Execute(IWebDriver driver)
        {
            int delaySeconds = _DelaySeconds ?? 1;
            if (delaySeconds > 0)
            {
                Thread.Sleep(System.TimeSpan.FromSeconds(delaySeconds));
            }
            try
            {
                string folderPath = _FolderPath;
                if (string.IsNullOrWhiteSpace(folderPath))
                {
                    folderPath = $"{Directory.GetCurrentDirectory()}/screenshots";
                }
                string fileName = _FileName;
                if (string.IsNullOrWhiteSpace(fileName))
                {
                    fileName = Guid.NewGuid().ToString().ToLower();
                }

                FileInfo file = new FileInfo($"{folderPath}/{fileName}.png");
                if (!file.Directory.Exists)
                {
                    file.Directory.Create();
                }

                var screenShotObj = ((ITakesScreenshot)driver).GetScreenshot();
                screenShotObj.SaveAsFile(file.FullName, ScreenshotImageFormat.Png);

            }
            catch { }
            return true;
        }
    }
}