using System.Threading.Tasks;

namespace VSSystem.ThirdParty.Actions
{
    public interface IAction
    {
        Task ExecuteAsync();
    }
}