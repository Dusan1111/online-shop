using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using WebAPI.Repositories.Interfaces;

namespace WebApi.Repositories.SQLRepositories
{
    public class ProductSQLRepository : IProductRepository
    {
        private readonly OnlineShopDbContext context;

        public ProductSQLRepository(OnlineShopDbContext context)
        {
            this.context = context;
        }

        public void AddProduct(Product item)
        {
            context.Products.Add(item);
            context.SaveChanges();
        }

        public void DeleteProduct(int id)
        {
            var product = context.Products.Find(id);

            if (product is not null)
            {
                context.Products.Remove(product);
                context.SaveChanges();
            }
        }

        public Product GetProduct(int id)
        {
            return context.Products.Include(product => product.ProductCategory).Include(product => product.ProductReviews).FirstOrDefault(x => x.Id == id);
        }

        public IEnumerable<Product> GetProducts()
        {
           return context.Products.Include(product => product.ProductCategory).Include(product => product.ProductReviews);
        }

        public IEnumerable<Product> GetProductsByCategory(HashSet<int?> categoryIds)
        {     
           return context.Products.Include(product => product.ProductCategory).Where(x => categoryIds.Contains(x.ProductCategoryId));
        }

        public void UpdateProduct(Product productChanges)
        { 
           context.Entry(productChanges).State = EntityState.Detached;
           context.Entry(productChanges).State = EntityState.Modified;
           context.SaveChanges();
        }
    }
}