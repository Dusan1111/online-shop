using System.Collections.Generic;
using WebAPI.Models;

namespace WebAPI.Repositories.Interfaces
{
    public interface IProductCategoryRepository
    {
        IEnumerable<ProductCategory> GetProductCategories();
        ProductCategory GetProductCategory(int id);
        void AddProductCategory(ProductCategory item);
        void UpdateProductCategory(ProductCategory item);
        void DeleteProductCategory(int id);
    }
}