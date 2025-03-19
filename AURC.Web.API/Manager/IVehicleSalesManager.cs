using AURC.Web.API.Models;

namespace AURC.Web.API.Manager
{
    public interface IVehicleSalesManager
    {
        Task<List<VehicleSales>> GetSalesAsync();
    }
}
