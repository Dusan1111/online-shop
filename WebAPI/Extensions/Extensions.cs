using System.Linq;
using WebAPI.Dtos.ProductCategoryDtos;
using WebAPI.Dtos.ProductDtos;
using WebAPI.Dtos.ProductReviewDtos;
using WebAPI.Models;

namespace WebApi.Extensions
{
    public static class Extensions
    {
        public static ProductDto AsDto(this Product product)
        {
            return new ProductDto()
            {
                Id = product.Id,
                Name = product.Name,
                Price = product.Price,
                ProductCategoryId = product.ProductCategoryId,
                ProductCategory = product.ProductCategory,
                ImageName = product.ImageName,
                Description = product.Description,
                Discount = product.Discount,
                DiscountedPrice = product.DiscountedPrice,
                ProductReviews = product.ProductReviews            
                };
        }

        public static ProductCategoryDto AsDto(this ProductCategory category)
        {
            return new ProductCategoryDto()
            {
                Id = category.Id,
                Name = category.Name,
            };
        }

        public static ProductReviewDto AsDto(this ProductReview productReview)
        {
            return new ProductReviewDto()
            {
                Id = productReview.Id,
                Description = productReview.Description,
                Rating = productReview.Rating,
                ProductId = productReview.ProductId,
                Product = productReview.Product,
                UserName = productReview.IdentityUser.UserName
            };
        }
    }
}