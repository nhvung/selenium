using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using BSSystem.Service.BSTestService.Service.Workers;
using VSSystem.Extensions;
using VSSystem.Extensions.Hosting;
using VSSystem.Logger;
using VSSystem.ServiceProcess;
using VSSystem.ServiceProcess.Extensions;

namespace BSSystem.Service.BSTestService.Service
{
    public class BSService : AService
    {
        public BSService(string name, int server_ID, string rootName, string privateKey, ALogger logger)
             : base(name, server_ID, rootName, privateKey, new string[]
             {
                "pools",
                "run_test_worker",
                "skype_authentication",
                "web_info",
                "skype_worker"
             }, logger)
        {
        }

        protected override void _InitializeWorkers()
        {
            try
            {
                AddWorker(new RunTestWorker(ServiceConfig.run_test_worker_enable, _name, ServiceConfig.run_test_worker_interval, ServiceConfig.run_test_worker_number_of_threads, _logger));
                AddWorker(new SkypeWorker(ServiceConfig.skype_worker_enable, _name, ServiceConfig.skype_worker_interval, ServiceConfig.skype_worker_number_of_threads, _logger));
            }
            catch (Exception ex)
            {
                this.LogError(ex);
            }
        }

        protected async override Task _InitConfiguration()
        {
            await base._InitConfiguration();
            try
            {
                _ini.ReadAllStaticConfigs<ServiceConfig>(_defaultSections);

                if (string.IsNullOrWhiteSpace(ServiceConfig.pools_request))
                {
                    ServiceConfig.pools_request = WorkingFolder.FullName + "/pools/request";
                }

                if (string.IsNullOrWhiteSpace(ServiceConfig.pools_execute))
                {
                    ServiceConfig.pools_execute = WorkingFolder.FullName + "/pools/execute";
                }
                if (string.IsNullOrWhiteSpace(ServiceConfig.pools_screenshots))
                {
                    ServiceConfig.pools_screenshots = WorkingFolder.FullName + "/pools/screenshots";
                }
                if (string.IsNullOrWhiteSpace(ServiceConfig.pools_temp))
                {
                    ServiceConfig.pools_temp = WorkingFolder.FullName + "/pools/temp";
                }
                if (string.IsNullOrWhiteSpace(ServiceConfig.pools_tasks))
                {
                    ServiceConfig.pools_tasks = WorkingFolder.FullName + "/pools/tasks";
                }
            }
            catch (Exception ex)
            {
                this.LogError(ex);
            }
        }
    }
}
