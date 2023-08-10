using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using VSSystem.Service.TestService.Extensions;
using VSSystem.Service.TestService.Models;
using VSSystem.Service.TestService.Request;
using Newtonsoft.Json;
using VSSystem.Collections.Generic.Extensions;
using VSSystem.Extensions.Hosting.Controllers;
using VSSystem.Extensions.Hosting.Models;

namespace VSSystem.Service.TestService.Controllers
{
    public class TestController : AController
    {
        System.IO.DirectoryInfo _executePoolFolder, _requestSchedulePoolFolder, _taskPoolFolder;
        public TestController() : base("TestController", BSHost.SERVICE_NAME, BSHost.StaticLogger, BSHost.PRIVATE_KEY)
        {
            _executePoolFolder = new System.IO.DirectoryInfo($"{ServiceConfig.pools_execute}");
            _requestSchedulePoolFolder = new System.IO.DirectoryInfo($"{ServiceConfig.pools_request}/schedule");
            _taskPoolFolder = new System.IO.DirectoryInfo($"{ServiceConfig.pools_tasks}");
        }
        protected override Task _ProcessApiContext(string path, string queryString)
        {
            try
            {
                if (path.Equals($"{_ServicePath}api/test/add/", StringComparison.InvariantCultureIgnoreCase))
                {
                    return Add();
                }
                else if (path.Equals($"{_ServicePath}api/test/result/", StringComparison.InvariantCultureIgnoreCase))
                {
                    return Result();
                }
                else if (path.Equals($"{_ServicePath}api/test/run/", StringComparison.InvariantCultureIgnoreCase))
                {
                    return Run();
                }
                else if (path.Equals($"{_ServicePath}api/test/list/tasks/", StringComparison.InvariantCultureIgnoreCase))
                {
                    return ListTasks();
                }
                else if (path.Equals($"{_ServicePath}api/test/delete/", StringComparison.InvariantCultureIgnoreCase))
                {
                    return Delete();
                }
                else if (path.Equals($"{_ServicePath}api/test/getfilters/", StringComparison.InvariantCultureIgnoreCase))
                {
                    return GetFilters();
                }
            }
            catch (Exception ex)
            {
                this.LogError(ex);
            }
            return base._ProcessApiContext(path, queryString);
        }

        async Task Delete()
        {
            try
            {
                var nameObjs = await this.GetRequestObject<string[]>(System.Text.Encoding.UTF8);
                PoolExtension.DeleteTasks(nameObjs);
                await this.ResponseJsonAsync(DefaultResponse.Success, System.Net.HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                this.LogError(ex);
            }
        }

        async Task Add()
        {
            try
            {
                DateTime utcNow = DateTime.UtcNow;
                DateTime now = DateTime.Now;
                var requestObj = await this.GetRequestObject<AddTestRequest>(System.Text.Encoding.UTF8);
                if (!string.IsNullOrWhiteSpace(requestObj?.Url) && (requestObj?.Login?.IsValid() ?? false))
                {
                    if (string.IsNullOrWhiteSpace(requestObj.Name))
                    {
                        requestObj.Name = $"Test added at {now.ToString("MM/dd/yyyy HH:mm:ss")}";
                    }
                    string guid = Guid.NewGuid().ToString().ToLower();
                    requestObj.ID = DateTimeOffset.UtcNow.ToUnixTimeSeconds();


                    var comparer = TComparer.Create<AddTestRequest>((r1, r2) => r1.Name?.Equals(r2.Name, StringComparison.InvariantCultureIgnoreCase) ?? false);
                    var requestObjs = PoolExtension.ListRequests();

                    var exitsRequestObj = requestObjs?.FirstOrDefault(ite => comparer.Equals(ite, requestObj));
                    if (exitsRequestObj != null)
                    {
                        guid = exitsRequestObj.Guid;
                    }

                    requestObj.Guid = guid;
                    if (requestObj.Schedule != null)
                    {
                        FileInfo file = new FileInfo($"{_requestSchedulePoolFolder.FullName}/{guid}.json");
                        if (!file.Directory.Exists)
                        {
                            file.Directory.Create();
                        }
                        string jsonRequest = JsonConvert.SerializeObject(requestObj, Formatting.Indented);
                        System.IO.File.WriteAllText(file.FullName, jsonRequest, System.Text.Encoding.UTF8);
                    }
                    else
                    {
                        string jsonRequest = JsonConvert.SerializeObject(requestObj, Formatting.Indented);
                        FileInfo taskFile = new FileInfo($"{_taskPoolFolder.FullName}/{guid}.json");
                        if (!taskFile.Directory.Exists)
                        {
                            taskFile.Directory.Create();
                        }
                        System.IO.File.WriteAllText(taskFile.FullName, jsonRequest, System.Text.Encoding.UTF8);
                        if (requestObj.RunImmediately?.Equals("true", StringComparison.InvariantCultureIgnoreCase) ?? false)
                        {
                            FileInfo file = new FileInfo($"{_executePoolFolder.FullName}/{guid}.json");
                            FileInfo signFile = new FileInfo($"{_executePoolFolder.FullName}/{guid}.sign");
                            if (!file.Directory.Exists)
                            {
                                file.Directory.Create();
                            }
                            System.IO.File.WriteAllText(file.FullName, jsonRequest, System.Text.Encoding.UTF8);
                            System.IO.File.WriteAllBytes(signFile.FullName, new byte[0]);
                        }

                    }

                    await this.ResponseJsonAsync(DefaultResponse.Success, System.Net.HttpStatusCode.OK);
                }
                else
                {
                    await this.ResponseJsonAsync(DefaultResponse.InvalidParameters, System.Net.HttpStatusCode.BadRequest);
                }
            }
            catch (Exception ex)
            {
                this.LogError(ex);
            }
        }

        async Task Result()
        {
            try
            {
                string sessionGuid = Request.Query["sessionguid"];
                if (!string.IsNullOrWhiteSpace(sessionGuid))
                {
                    string screenShotsFolderPath = $"{ServiceConfig.pools_temp}/screenshots/{sessionGuid}";
                    DirectoryInfo screenshotsFolder = new DirectoryInfo(screenShotsFolderPath);

                    if (screenshotsFolder.Exists)
                    {
                        var files = screenshotsFolder.GetFiles();
                        if (files?.Length > 0)
                        {
                            List<object> responseObjs = new List<object>();
                            foreach (var file in files.OrderBy(ite => ite.LastWriteTimeUtc))
                            {
                                responseObjs.Add(new
                                {
                                    name = file.Name,
                                    length = file.Length.ToString(),
                                    url = $"{ServiceConfig.web_info_public_url}/api/screenshots/{sessionGuid}/{file.Name.ToLower()}"
                                });
                            }
                            await this.ResponseJsonAsync(responseObjs, System.Net.HttpStatusCode.OK);
                        }
                    }
                }

            }
            catch (Exception ex)
            {
                this.LogError(ex);
            }
            await this.ResponseJsonAsync(DefaultResponse.NoRecordFound, System.Net.HttpStatusCode.NoContent);
        }
        async Task Run()
        {
            try
            {
                DateTime now = DateTime.Now;
                string taskName = Request.Query["name"];
                var requestObj = await this.GetRequestObject<RunTestRequest>(System.Text.Encoding.UTF8);
                var taskObjs = PoolExtension.ListRequests();
                if (taskObjs?.Count > 0)
                {
                    if (!string.IsNullOrWhiteSpace(taskName))
                    {
                        var taskObj = taskObjs.FirstOrDefault(ite => (ite.Name?.Equals(taskName, StringComparison.InvariantCultureIgnoreCase) ?? false));
                        if (taskObj != null)
                        {
                            if (requestObj != null)
                            {
                                taskObj.SkypeIds = requestObj.SkypeIds;
                                taskObj.Emails = requestObj.Emails;
                            }
                            string guid = Guid.NewGuid().ToString().ToLower();
                            FileInfo file = new FileInfo($"{_executePoolFolder.FullName}/{guid}.json");
                            FileInfo signFile = new FileInfo($"{_executePoolFolder.FullName}/{guid}.sign");
                            if (!file.Directory.Exists)
                            {
                                file.Directory.Create();
                            }
                            string jsonRequest = JsonConvert.SerializeObject(taskObj);
                            System.IO.File.WriteAllText(file.FullName, jsonRequest, System.Text.Encoding.UTF8);
                            System.IO.File.WriteAllBytes(signFile.FullName, new byte[0]);
                            await this.ResponseJsonAsync(DefaultResponse.Success, System.Net.HttpStatusCode.OK);
                            return;
                        }
                    }
                    else
                    {
                        if (requestObj?.Names?.Count > 0)
                        {
                            var executeTaskObjs = taskObjs.Where(ite => requestObj.Names.Contains(ite.Name, StringComparer.InvariantCultureIgnoreCase))?.ToList();
                            if (executeTaskObjs?.Count > 0)
                            {
                                foreach (var taskObj in executeTaskObjs)
                                {
                                    try
                                    {
                                        if (requestObj != null)
                                        {
                                            taskObj.SkypeIds = requestObj.SkypeIds;
                                            taskObj.Emails = requestObj.Emails;
                                        }
                                        string guid = Guid.NewGuid().ToString().ToLower();
                                        FileInfo file = new FileInfo($"{_executePoolFolder.FullName}/{guid}.json");
                                        FileInfo signFile = new FileInfo($"{_executePoolFolder.FullName}/{guid}.sign");
                                        if (!file.Directory.Exists)
                                        {
                                            file.Directory.Create();
                                        }
                                        string jsonRequest = JsonConvert.SerializeObject(taskObj);
                                        System.IO.File.WriteAllText(file.FullName, jsonRequest, System.Text.Encoding.UTF8);
                                        System.IO.File.WriteAllBytes(signFile.FullName, new byte[0]);
                                        await this.ResponseJsonAsync(DefaultResponse.Success, System.Net.HttpStatusCode.OK);
                                    }
                                    catch (Exception ex)
                                    {
                                        this.LogError(ex);
                                    }
                                }
                            }
                        }

                    }
                }

            }
            catch (Exception ex)
            {
                this.LogError(ex);
            }
            await this.ResponseJsonAsync(DefaultResponse.NoRecordFound, System.Net.HttpStatusCode.OK);
        }
        async Task ListTasks()
        {
            try
            {
                double timezoneOffset;
                double.TryParse(Request.Query["timezoneOffset"], out timezoneOffset);
                string creatorName = Request.Query["creator"];
                var taskObjs = PoolExtension.ListRequests();
                string dtFormat = "MM/dd/yyyy HH:mm";
                if (taskObjs?.Count > 0)
                {
                    List<object> responseObjs = new List<object>();
                    foreach (var taskObj in taskObjs.OrderBy(ite => ite.ID))
                    {
                        if (!string.IsNullOrWhiteSpace(creatorName))
                        {
                            if (!taskObj.CreatorName.Equals(creatorName, StringComparison.InvariantCultureIgnoreCase))
                            {
                                continue;
                            }
                        }
                        DateTime createdTime = DateTimeOffset.FromUnixTimeSeconds(taskObj.ID).DateTime;
                        if (timezoneOffset != 0)
                        {
                            createdTime = createdTime.AddMinutes(-timezoneOffset);
                        }

                        responseObjs.Add(new
                        {
                            id = taskObj.ID.ToString(),
                            name = taskObj.Name,
                            browser = taskObj.Browser,
                            isIncognito = taskObj.IsIncognito,
                            executeUrl = $"{ServiceConfig.web_info_public_url}/api/test/run?name={System.Web.HttpUtility.UrlEncode(taskObj.Name)}",
                            createdTime = createdTime.ToString(dtFormat),
                            creator = taskObj.CreatorName
                        });
                    }
                    await this.ResponseJsonAsync(responseObjs, System.Net.HttpStatusCode.OK);
                    return;
                }
            }
            catch (Exception ex)
            {
                this.LogError(ex);
            }
            await this.ResponseJsonAsync(DefaultResponse.NoRecordFound, System.Net.HttpStatusCode.OK);
        }
        async Task GetFilters()
        {
            try
            {
                var accountObjs = AccountExtension.ListAccounts();
                if (accountObjs?.Count > 0)
                {
                    List<string> creatorNames = accountObjs.Select(ite => ite.Name).Distinct(StringComparer.InvariantCultureIgnoreCase).ToList();
                    var responseObj = new
                    {
                        creators = creatorNames
                    };
                    await this.ResponseJsonAsync(responseObj, System.Net.HttpStatusCode.OK);
                    return;
                }
            }
            catch (Exception ex)
            {
                this.LogError(ex);
            }
            await this.ResponseJsonAsync(DefaultResponse.NoRecordFound, System.Net.HttpStatusCode.OK);
        }
    }
}