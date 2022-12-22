using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using WebAPI.Repositories.Interfaces;

namespace WebApi.Repositories.SQLRepositories
{
    public class ProductReviewSQLRepository : IProductReviewRepository
    {
        private readonly OnlineShopDbContext context;

        public ProductReviewSQLRepository(OnlineShopDbContext context)
        {
            this.context = context;
        }

        public void AddProductReview(ProductReview productReview)
        {
            context.ProductReviews.Add(productReview);
            context.SaveChanges();
        }

        public IEnumerable<ProductReview> GetProductReviews(int productId)
        {
            return context.ProductReviews.Include(x => x.IdentityUser).Where(x => x.ProductId == productId);
        }
     
    }
}