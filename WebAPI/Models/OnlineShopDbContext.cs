using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Models
{
    public class OnlineShopDbContext : IdentityDbContext
    {
        public OnlineShopDbContext(DbContextOptions<OnlineShopDbContext> options)
             : base(options)
        {

        }      
        
        public DbSet<ProductReview> ProductReviews { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Discount> Discounts { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductCategory> ProductCategories { get; set; }

        //ovde se pozivaju potrebne konfiguracije za date tabele gde se vrsi konverzija 
        //za neke kolone ukoliko ima potrebe za tim
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfigurationsFromAssembly(typeof(OnlineShopDbContext).Assembly);
            base.OnModelCreating(builder);
        }
    }
}