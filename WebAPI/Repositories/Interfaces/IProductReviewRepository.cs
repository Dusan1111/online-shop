using System.Collections.Generic;
using WebAPI.Models;

namespace WebAPI.Repositories.Interfaces
{
    public interface IProductReviewRepository
    {
        IEnumerable<ProductReview> GetProductReviews(int productId);
        void AddProductReview(ProductReview productReview);
    }
}
