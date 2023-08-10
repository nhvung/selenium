using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using BSSystem.Service.BSTestService.Request;
using Newtonsoft.Json;

namespace BSSystem.Service.BSTestService.Extensions
{
    class PoolExtension
    {
        public static List<AddTestRequest> ListRequests()
        {
            List<AddTestRequest> result = new List<AddTestRequest>();
            try
            {
                if (!string.IsNullOrWhiteSpace(ServiceConfig.pools_tasks))
                {
                    DirectoryInfo tasksFolder = new DirectoryInfo(ServiceConfig.pools_tasks);
                    if (tasksFolder.Exists)
                    {
                        var files = tasksFolder.GetFiles("*.json");
                        foreach (var file in files.OrderBy(ite => ite.LastWriteTimeUtc))
                        {
                            string jsonRequest = File.ReadAllText(file.FullName, System.Text.Encoding.UTF8);
                            AddTestRequest requestObj = JsonConvert.DeserializeObject<AddTestRequest>(jsonRequest);
                            if (requestObj != null)
                            {
                                result.Add(requestObj);
                            }
                            else
                            {
                                try
                                {
                                    file.Delete();
                                }
                                catch { }
                            }

                        }
                    }
                }

            }
            catch { }
            return result;
        }

        public static int DeleteTasks(params string[] names)
        {
            try
            {
                if (names?.Length > 0)
                {
                    var requestObjs = ListRequests();
                    if (requestObjs?.Count > 0)
                    {
                        var deleteRequestObjs = requestObjs.Where(ite => names.Contains(ite.Name, StringComparer.InvariantCultureIgnoreCase)).ToList();
                        if (deleteRequestObjs?.Count > 0)
                        {
                            if (!string.IsNullOrWhiteSpace(ServiceConfig.pools_tasks))
                            {
                                DirectoryInfo tasksFolder = new DirectoryInfo(ServiceConfig.pools_tasks);
                                if (tasksFolder.Exists)
                                {
                                    foreach (var requestObj in deleteRequestObjs)
                                    {
                                        var file = new FileInfo($"{tasksFolder.FullName}/{requestObj.Guid}.json");
                                        if (file.Exists)
                                        {
                                            try
                                            {
                                                file.Attributes = FileAttributes.Archive;
                                                file.Delete();
                                            }
                                            catch { }
                                        }
                                    }
                                }

                            }
                        }
                    }
                }
            }
            catch { }
            return 0;
        }
    }
}