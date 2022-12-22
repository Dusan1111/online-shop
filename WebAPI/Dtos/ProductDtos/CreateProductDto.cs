using System.ComponentModel.DataAnnotations;
using WebAPI.Models;

namespace WebAPI.Dtos.ProductDtos
{
    public class CreateProductDto
    {
        [Required]
        public string Name { get; init; }

        [Required]
        [Range(1, 1000)]
        public double Price { get; init; }
           
        [Required]
        public double Ammount { get; set; }

        [Required]
        public int ProductCategoryId { get; init; }
     
        [Required]
        public string ImageName { get; init; }

        public string Description { get; set; }

        public double Discount { get; init; }

        public double DiscountedPrice { get; init; }
    }

}
