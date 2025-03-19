using AURC.Web.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AURC.Web.API.DdContextConfiguration
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
        public DbSet<VehicleSales> vehicleSales { get; set; }
    }
}
