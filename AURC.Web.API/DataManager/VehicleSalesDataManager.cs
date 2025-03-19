using AURC.Web.API.DdContextConfiguration;
using AURC.Web.API.Manager;
using AURC.Web.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AURC.Web.API.DataManager
{
    public class VehicleSalesDataManager : IVehicleSalesManager
    {
        private readonly ApplicationDBContext _context;
        public VehicleSalesDataManager(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<List<VehicleSales>> GetSalesAsync()
        {
            return await _context.vehicleSales.ToListAsync();
        }
    }
}
