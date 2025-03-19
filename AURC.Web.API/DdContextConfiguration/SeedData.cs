namespace AURC.Web.API.DdContextConfiguration
{
    public static class SeedData
    {
        public static void Initialize(ApplicationDBContext context)
        {
            context.SaveChanges();
        }
    }
}
