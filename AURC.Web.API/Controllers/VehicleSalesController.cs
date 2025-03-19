using AURC.Web.API.Manager;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AURC.Web.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleSalesController : ControllerBase
    {
        private readonly IVehicleSalesManager _vehicleSalesManager;
        public VehicleSalesController(IVehicleSalesManager vehicleSalesManager)
        {
            _vehicleSalesManager = vehicleSalesManager;
        }
        [HttpGet]
        [Route("GetVehicleSalesAsync")]
        public async Task<IActionResult> GetVehicleSalesAsync()
        {
            try
            {
                var response = await _vehicleSalesManager.GetSalesAsync();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving vehicle sales data.", error = ex.Message });
            }
        }
    }
}
