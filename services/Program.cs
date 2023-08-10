using System.Threading.Tasks;

namespace VSSystem.Service.TestService
{
    public class Program
    {
        const string PRIVATE_KEY = "304c3357-3376-7645-2164-336e63332139";
        static Task Main(string[] args)
        {
            return new BSHost("TestService", 4151, null, PRIVATE_KEY).RunAsync(args);

        }
    }
}
