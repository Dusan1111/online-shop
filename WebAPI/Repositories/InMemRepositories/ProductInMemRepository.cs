using System;
using System.Collections.Generic;
using System.Linq;
using WebAPI.Models;
using WebAPI.Repositories.Interfaces;

namespace WebApi.Repositories
{
    public class OnlineShopInMemRepository : IProductRepository
    {
        private List<Product> products = new()
        {
            new Product()
            {
                Id = 1,
                Name = "Coca-Cola",
                Price = 46,
                Description = "Refreshing soda drink",
            },
        };

        public void AddProduct(Product product)
        {
            if (products.Any(x => x.Id == product.Id))
            {
                return;
            }
            products.Add(product);
            Console.WriteLine(product.Id.ToString() + " " + product.Price);
        }

        public void DeleteProduct(int id)
        {
            var index = products.FindIndex(existingProduct => existingProduct.Id == id);
            products.RemoveAt(index);
        }

        public Product GetProduct(int id)
        {
            return products.Where(x => x.Id == id).SingleOrDefault();
        }

        public IEnumerable<Product> GetProducts()
        {
            return products;
        }

        public IEnumerable<Product> GetProductsByCategory(HashSet<int?> categoryIds)
        {
            return products.Where(x => categoryIds.Contains(x.ProductCategoryId));
        }

        public void UpdateProduct(Product product)
        {
            var index = products.FindIndex(existingProduct => existingProduct.Id == product.Id);
            products[index] = product;
        }
    }
}