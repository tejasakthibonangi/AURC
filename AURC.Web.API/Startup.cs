using AURC.Web.API.DataManager;
using AURC.Web.API.DdContextConfiguration;
using AURC.Web.API.Manager;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;

namespace AURC.Web.API
{
    public class Startup
    {
        private readonly IConfiguration _configuration;
        private static string contentRootPath;
        public Startup(IConfiguration configuration,
            IWebHostEnvironment env)
        {
            _configuration = configuration;
            contentRootPath = env.ContentRootPath;

        }
        public void ConfigureServices(IServiceCollection services)
        {
            var databasePath = Path.Combine(contentRootPath, "DdContextConfiguration", "mydatabase.db");

            Console.WriteLine($"Database Path: {databasePath}");

            services.AddDbContext<ApplicationDBContext>(options => options.UseSqlite($"Data Source={databasePath}"));


            services.AddControllers().AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
            });

            services.AddMvc().AddXmlSerializerFormatters();

            services.AddScoped<IVehicleSalesManager, VehicleSalesDataManager>();

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builder =>
                    builder.WithOrigins("http://localhost:5138")
                           .AllowAnyHeader()
                           .AllowAnyMethod());
            });
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                                   builder => builder
                                  .AllowAnyOrigin()
                                  .AllowAnyHeader()
                                  .AllowAnyMethod()
                                  .WithMethods("GET", "PUT", "DELETE", "POST", "PATCH")
                                  );
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "AURC Service", Version = "v1" });
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var dbContext = serviceScope.ServiceProvider.GetRequiredService<ApplicationDBContext>();

                if (env.IsDevelopment())
                {
                    dbContext.Database.Migrate();
                    SeedData.Initialize(dbContext);
                }
            }

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseCors("CorsPolicy");

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseStaticFiles();

            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "AURC Service");
            });
        }
    }
}
