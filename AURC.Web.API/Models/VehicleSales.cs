using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AURC.Web.API.Models
{
    [Table("VehicleSales")]
    public class VehicleSales
    {
        [Key]
        public int Id { get; set; }
        public string? Month { get; set; }
        public int? NewVehicleSales { get; set; }
        public int? UsedVehicleSales { get; set; }
        public int? NewVehicleInventory { get; set; }
        public int? AppointmentSetRate { get; set; }
        public int? AppointmentCloseRate { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public string? ModifiedBy { get; set; }
        public bool IsActive { get; set; } // Boolean 
    }
}
