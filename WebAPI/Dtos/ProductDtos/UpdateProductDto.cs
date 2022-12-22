using System;
using System.ComponentModel.DataAnnotations;
using WebAPI.Dtos.ProductCategoryDtos;

namespace WebAPI.Dtos.ProductDtos
{
    public class UpdateProductDto
    {   
        [Required]
        public int Id { get; init; }

        [Required]
        public string Name { get; init; }

        [Required]
        [Range(1, 1000)]
        public double Price { get; init; }
        public int ProductCategoryId { get; init; }
        public ProductCategoryDto ProductCategory {get; init;}
        [Required]
        public string ImageName {get; init;}
        public string Description { get; set; }
        public double Discount { get; set; }
        public double DiscountedPrice { get; init; }
    }
}
