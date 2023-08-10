using System;
using System.Threading;
using System.Threading.Tasks;
using VSSystem.Logger;
using VSSystem.ServiceProcess.Workers;
using VSSystem.ServiceProcess.Extensions;
using VSSystem.ThirdParty.Microsoft.Skype.Models.Message;
using BSSystem.Service.BSTestService.Extensions;
using System.Linq;
using BSSystem.Service.BSTestService.Models;
using System.IO;
using VSSystem.Threading.Tasks.Extensions;
using System.Collections.Generic;

namespace BSSystem.Service.BSTestService.Service.Workers
{
    class SkypeWorker : IntervalWorker
    {
        long _startTime;
        Queue<MessageInfo> _qProcesses;
        System.Timers.Timer _tmrExecute;
        object _queueLockObj;
        int _freeThreadCount;

        public SkypeWorker(bool enabled, string serviceName, int interval, int numberOfThreads, ALogger logger)
                  : base(new IntervalWorkerStartInfo
                  {
                      Name = "SkypeWorker",
                      Enabled = enabled,
                      Interval = interval,
                      IntervalUnit = EWorkerIntervalUnit.Second,
                      ServiceName = serviceName,
                      NumberOfThreads = numberOfThreads
                  }, logger)
        {
            if (_startTime <= 0)
            {
                _startTime = VSSystem.Extensions.DateTimeExtension.ToMilisecondsTimestamp(DateTime.UtcNow);
            }
            _queueLockObj = new object();
            _qProcesses = new Queue<MessageInfo>(_NumberOfThreads);
            _freeThreadCount = _NumberOfThreads;
            _tmrExecute = null;
        }
        async protected override Task _RunInternalTasksAsync(CancellationToken cancellationToken)
        {
            try
            {
                if (_tmrExecute == null)
                {
                    _tmrExecute = new System.Timers.Timer(500);
                    _tmrExecute.Elapsed += async (o, e) => await _tmrExecute_Elapsed(o, e, cancellationToken);
                    _tmrExecute.Start();
                }

                var messageObjs = await SkypeExtension.Client?.GetMessagesByIdAsync(ServiceConfig.skype_worker_group_id, _startTime, false, cancellationToken);
                if (messageObjs?.Count > 0)
                {
                    foreach (var messageObj in messageObjs)
                    {


                        lock (_queueLockObj)
                        {
                            _qProcesses.Enqueue(messageObj);
                        }
                    }
                    _startTime = messageObjs.Max(ite => ite.ID) + 1;
                }
            }
            catch (Exception ex)
            {
                this.LogError(ex);
            }

        }

        Task _tmrExecute_Elapsed(object sender, System.Timers.ElapsedEventArgs e, CancellationToken cancellationToken = default)
        {
            _tmrExecute.Stop();

            try
            {
                while (_qProcesses?.Count > 0)
                {
                    if (_freeThreadCount > 0)
                    {
                        MessageInfo messageObj = null;
                        lock (_queueLockObj)
                        {
                            try
                            {
                                messageObj = _qProcesses.Dequeue();
                            }
                            catch { }
                        }
                        if (messageObj != null)
                        {
                            lock (_queueLockObj)
                            {
                                _freeThreadCount--;
                            }
                            Task.Run(() => _ProcessMessageAsync(messageObj, cancellationToken));
                            Thread.Sleep(500);
                            lock (_queueLockObj)
                            {
                                _freeThreadCount++;
                            }

                        }
                    }
                    Thread.Sleep(500);
                }
            }
            catch { }

            if (!cancellationToken.IsCancellationRequested)
            {
                _tmrExecute?.Start();
            }
            return Task.CompletedTask;
        }

        async Task _ProcessMessageAsync(MessageInfo messageObj, CancellationToken cancellationToken)
        {
            string prefixStatement = "please help me run ";
            if (messageObj.Content.StartsWith($"{prefixStatement}", StringComparison.InvariantCultureIgnoreCase))
            {
                try
                {
                    var replyMessageObj = new QuoteMessageInfo(messageObj, "Great! On my way...");
                    messageObj.ID = await SkypeExtension.Client?.SendMessageAsync(messageObj.ConversationLink, replyMessageObj, cancellationToken);
                }
                catch { }

                if (messageObj.Content.StartsWith($"{prefixStatement}daily check production", StringComparison.InvariantCultureIgnoreCase))
                {
                    await _RunDailyCheckProduction(messageObj.ConversationLink, messageObj, messageObj.ID, cancellationToken);
                }
                else
                {
                    string name = messageObj.Content.Substring(prefixStatement.Length).Trim();
                    if (!string.IsNullOrWhiteSpace(name))
                    {
                        await _RunTaskAsync(name, messageObj.ConversationLink, messageObj, messageObj.ID, cancellationToken);
                    }

                }
            }

        }

        Task _RunDailyCheckProduction(string conversationLink, MessageInfo requestMessageObj, long mId, CancellationToken cancellationToken)
        {
            return _RunTaskAsync("DailyCheckProduction", conversationLink, requestMessageObj, mId, cancellationToken);
        }
        async Task _RunTaskAsync(string name, string conversationLink, MessageInfo requestMessageObj, long mId, CancellationToken cancellationToken)
        {
            try
            {
                DateTime now = DateTime.Now;
                var requestObjs = PoolExtension.ListRequests();
                var requestObj = requestObjs?.FirstOrDefault(ite => ite.Name.Equals(name, StringComparison.InvariantCultureIgnoreCase));
                if (requestObj != null)
                {
                    var taskObj = SeleniumTaskExtension.ConvertToTask(requestObj);
                    if (taskObj != null)
                    {
                        new VSSystem.ThirdParty.Selenium.Client().Execute(taskObj, WorkingFolder.FullName, () => _FinishNotify(taskObj, now, conversationLink, requestMessageObj, mId, cancellationToken), this.LogDebug, this.LogError);
                    }
                }
                else
                {
                    var replyMessageObj = new QuoteMessageInfo(requestMessageObj, $"Oh, I can find the task which named <{name}>. Can you try another one?", mId);
                    await SkypeExtension.Client?.SendMessageAsync(conversationLink, replyMessageObj, cancellationToken);
                }

            }
            catch { }

        }
        void _FinishNotify(ActionTaskExt taskObj, DateTime beginTime, string conversationLink, MessageInfo requestMessageObj, long mId, CancellationToken cancellationToken)
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
                string responseMessage = $"Test done. Total time: {sSpentTime}.";
                if (!string.IsNullOrWhiteSpace(screenShotsFolderPath))
                {
                    responseMessage = $"Test done. Total time: {sSpentTime}. Please review screenshots at {ServiceConfig.web_info_public_url}/result?sessionguid={taskObj.SessionGuid}&ticks={DateTime.UtcNow.Ticks}";
                }
                var replyMessageObj = new QuoteMessageInfo(requestMessageObj, responseMessage);
                SkypeExtension.Client?.SendMessageAsync(conversationLink, replyMessageObj, cancellationToken).Wait();

            }
            catch (Exception ex)
            {
                this.LogError(ex);
            }
        }
    }
}