using backend.Products;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Basket.Basket> Baskets { get; set; }
    }
}
