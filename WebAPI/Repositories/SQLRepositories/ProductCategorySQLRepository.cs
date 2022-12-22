using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using WebAPI.Repositories.Interfaces;

namespace WebApi.Repositories.SQLRepositories
{
    public class ProductCategorySQLRepository : IProductCategoryRepository
    {
        private readonly OnlineShopDbContext context;

        public ProductCategorySQLRepository(OnlineShopDbContext context)
        {
            this.context = context;
        }

        public void AddProductCategory(ProductCategory productCategory)
        {
            context.ProductCategories.Add(productCategory);
            context.SaveChanges();
        }

        public void DeleteProductCategory(int id)
        {
            var productCategory = context.ProductCategories.Find(id);

            if (productCategory is not null)
            {
                context.ProductCategories.Remove(productCategory);
                context.SaveChanges();
            }
        }

        public IEnumerable<ProductCategory> GetProductCategories()
        {
            return context.ProductCategories;
        }

        public ProductCategory GetProductCategory(int id)
        {
            return context.ProductCategories.FirstOrDefault(x => x.Id == id);
        }

        public void UpdateProductCategory(ProductCategory categoryChanges)
        {
            context.Entry(categoryChanges).State = EntityState.Detached;
            context.Entry(categoryChanges).State = EntityState.Modified;
            context.SaveChanges();
        }
    }
}