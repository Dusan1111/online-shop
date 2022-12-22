using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace WebAPI.Models
{
    public record Product
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [Display(Name = "Product name")]
        [MaxLength(100, ErrorMessage = "Maximum length for product name is 100 characters")]
        public string Name { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Price must be greater than 0")]
        [RegularExpression(@"^\d*\.?\d{0,2}$", ErrorMessage = "Price can't have more than 2 decimal places")]
        public double Price { get; set; }
        // [Required]
        [Range(0, int.MaxValue, ErrorMessage = "Ammount must be greater than 0")]
        public double Ammount { get; set; }

        public double Discount { get; set; }

        public string UnitOfMeasurement { get; set; }

        [MaxLength(250, ErrorMessage = "Maximum length for product descitption is 250 characters")]
        public string Description { get; set; }

        [Required]
        public int? ProductCategoryId { get; set; }

        [ForeignKey("ProductCategoryId")]
        public ProductCategory ProductCategory { get; set; }

        public string ImageName { get; set; }

        public double DiscountedPrice { get; private set; }

        public List<ProductReview> ProductReviews { get; set; }

        public void CalculateDiscountedPrice()
        {
            DiscountedPrice = Price - Math.Round(Price * (Discount / 100), 2);
        }
    }
}