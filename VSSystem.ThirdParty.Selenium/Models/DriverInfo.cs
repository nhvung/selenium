using System;
using System.Diagnostics;
using System.Runtime.InteropServices;
using OpenQA.Selenium;

namespace VSSystem.ThirdParty.Selenium.Models
{
    public class DriverInfo : IDisposable
    {
        IWebDriver _Driver;
        public IWebDriver Driver { get { return _Driver; } set { _Driver = value; } }
        int _ProcessId;
        public int ProcessId { get { return _ProcessId; } set { _ProcessId = value; } }
        public void Dispose()
        {
            _Driver?.Close();
            _Driver?.Quit();
            if (_ProcessId > 0)
            {
                try
                {
                    var process = Process.GetProcessById(_ProcessId);
                    if (process != null)
                    {
                        process.Kill();
                    }
                }
                catch // (Exception ex)
                {

                }
            }
        }
        public DriverInfo() { }
        public DriverInfo(IWebDriver driver, int processId)
        {
            _Driver = driver;
            _ProcessId = processId;
        }
    }
}