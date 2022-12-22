using System.Collections.Generic;
using WebAPI.Models;

namespace WebAPI.Repositories.Interfaces
{
    public interface IProductRepository
    {
        IEnumerable<Product> GetProducts();
        Product GetProduct(int id);
        void AddProduct(Product item);
        void UpdateProduct(Product item);
        void DeleteProduct(int id);
        IEnumerable<Product> GetProductsByCategory(HashSet<int?> categoryIds);
    }
}
