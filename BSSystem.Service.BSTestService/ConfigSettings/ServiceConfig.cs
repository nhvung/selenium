namespace BSSystem.Service.BSTestService
{
    class ServiceConfig
    {
        #region web_info
        static string _web_info_name = "autotest";
        public static string web_info_name { get { return _web_info_name; } set { _web_info_name = value; } }
        static string _web_info_public_url = "http://localhost:4151/autotest";
        public static string web_info_public_url { get { return _web_info_public_url; } set { _web_info_public_url = value; } }
        #endregion

        #region pools
        static string _pools_request;
        public static string pools_request { get { return _pools_request; } set { _pools_request = value; } }
        static string _pools_execute;
        public static string pools_execute { get { return _pools_execute; } set { _pools_execute = value; } }
        static string _pools_screenshots;
        public static string pools_screenshots { get { return _pools_screenshots; } set { _pools_screenshots = value; } }
        static string _pools_temp;
        public static string pools_temp { get { return _pools_temp; } set { _pools_temp = value; } }
        static string _pools_tasks;
        public static string pools_tasks { get { return _pools_tasks; } set { _pools_tasks = value; } }
        #endregion

        #region skype_authentication
        static string _skype_authentication_signin_name;
        public static string skype_authentication_signin_name { get { return _skype_authentication_signin_name; } set { _skype_authentication_signin_name = value; } }
        static string _skype_authentication_password;
        public static string skype_authentication_password { get { return _skype_authentication_password; } set { _skype_authentication_password = value; } }

        #endregion

        #region run_test_worker
        static bool _run_test_worker_enable = true;
        public static bool run_test_worker_enable { get { return _run_test_worker_enable; } set { _run_test_worker_enable = value; } }
        static int _run_test_worker_interval = 5;
        public static int run_test_worker_interval { get { return _run_test_worker_interval; } set { _run_test_worker_interval = value; } }
        static int _run_test_worker_number_of_threads = 1;
        public static int run_test_worker_number_of_threads { get { return _run_test_worker_number_of_threads; } set { _run_test_worker_number_of_threads = value; } }
        #endregion

        #region skype_worker
        static bool _skype_worker_enable = true;
        public static bool skype_worker_enable { get { return _skype_worker_enable; } set { _skype_worker_enable = value; } }
        static int _skype_worker_interval = 5;
        public static int skype_worker_interval { get { return _skype_worker_interval; } set { _skype_worker_interval = value; } }
        static int _skype_worker_number_of_threads = 1;
        public static int skype_worker_number_of_threads { get { return _skype_worker_number_of_threads; } set { _skype_worker_number_of_threads = value; } }
        static string _skype_worker_group_id = "19:a147e5877e7c494e95d94ca0e5155dc6@thread.skype";
        public static string skype_worker_group_id { get { return _skype_worker_group_id; } set { _skype_worker_group_id = value; } }
        #endregion
    }
}