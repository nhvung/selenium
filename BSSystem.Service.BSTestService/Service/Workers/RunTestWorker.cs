using System;
using System.Threading;
using VSSystem.Logger;
using VSSystem.ServiceProcess.Workers;
using VSSystem.ServiceProcess.Extensions;
using System.IO;
using Newtonsoft.Json;
using BSSystem.Service.BSTestService.Extensions;
using BSSystem.Service.BSTestService.Models;
using BSSystem.Service.BSTestService.Request;

namespace BSSystem.Service.BSTestService.Service.Workers
{
    class RunTestWorker : PoolWorker
    {
        public RunTestWorker(bool enabled, string serviceName, int interval, int numberOfThreads, ALogger logger)
                   : base(new IntervalWorkerStartInfo
                   {
                       Name = "RunTestWorker",
                       Enabled = enabled,
                       Interval = interval,
                       IntervalUnit = EWorkerIntervalUnit.Second,
                       ServiceName = serviceName,
                       NumberOfThreads = numberOfThreads
                   }, logger)
        {
            _initPoolFolderAction = delegate
            {
                _poolFolder = new System.IO.DirectoryInfo($"{ServiceConfig.pools_execute}");
            };
            _processFileExtension = ".json";


        }

        protected override void ProcessFile(FileInfo processFile, CancellationToken cancellationToken)
        {
            try
            {
                DateTime now = DateTime.Now;
                string jsonRequest = File.ReadAllText(processFile.FullName, System.Text.Encoding.UTF8);
                var requestObj = JsonConvert.DeserializeObject<AddTestRequest>(jsonRequest);
                if (requestObj != null)
                {
                    ActionTaskExt taskObj = SeleniumTaskExtension.ConvertToTask(requestObj);
                    new VSSystem.ThirdParty.Selenium.Client().Execute(taskObj, WorkingFolder.FullName, () => _FinishNotify(taskObj, now), this.LogDebug, this.LogError);
                }
            }
            catch (Exception ex)
            {
                this.LogError(ex);
            }
        }
        void _FinishNotify(ActionTaskExt taskObj, DateTime beginTime)
        {
            try
            {
                DateTime now = DateTime.Now;
                TimeSpan tsSpentTime = now - beginTime;
                string sSpentTime = Math.Round(tsSpentTime.TotalSeconds).ToString("0") + "s";
                string screenShotsFolderPath = "";
                if (!string.IsNullOrWhiteSpace(taskObj.SessionGuid))
                {
                    screenShotsFolderPath = $"{ServiceConfig.pools_temp}/screenshots/{taskObj.SessionGuid}";
                    if (!Directory.Exists(screenShotsFolderPath))
                    {
                        screenShotsFolderPath = null;
                    }
                }
                if (taskObj.SkypeIds?.Count > 0)
                {
                    string responseMessage = $"Test done. Total time: {sSpentTime}.";
                    if (!string.IsNullOrWhiteSpace(screenShotsFolderPath))
                    {
                        responseMessage = $"Test done. Total time: {sSpentTime}. Please review screenshots at {ServiceConfig.web_info_public_url}/result?sessionguid={taskObj.SessionGuid}";
                    }
                    foreach (var skypeId in taskObj.SkypeIds)
                    {
                        if (string.IsNullOrWhiteSpace(skypeId))
                        {
                            continue;
                        }
                        SkypeExtension.SendPrivateMessageAsync(skypeId, responseMessage).Wait();
                    }
                }

            }
            catch (Exception ex)
            {
                this.LogError(ex);
            }
        }
    }
}