using System;
using WebAPI.Models;
using System.Collections.Generic;
using System.Linq;

namespace WebAPI.Dtos.ProductDtos
{
    public class ProductDto
    {
        public int Id { get; init; }
        public string Name { get; init; }
        public double Price { get; init; }
        public int? ProductCategoryId { get; set; }
        public ProductCategory ProductCategory {get; init;}
        public string ImageName { get; set; }
        public string Description { get; set; }
        public double Discount { get; init; }
        public double DiscountedPrice { get; init; }
        public List<ProductReview> ProductReviews { get; init; }
       
        public double Rating
        {
            get
            {
                double rating = 0;
                if(ProductReviews == null || ProductReviews.Count == 0)
                {
                    return rating;
                }
                 rating = ProductReviews.Sum(x => x.Rating) / ProductReviews.Count;
                 return rating;
            }
        }
    }
}
