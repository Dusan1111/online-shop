using System.ComponentModel.DataAnnotations;
using WebAPI.Models;

namespace WebAPI.Dtos.ProductReviewDtos
{
    public class ProductReviewDto
    {
        [Required]
        public int Id { get; init; }

        public string Description { get; set; }

        [Required]
        public double Rating { get; set; }

        public int ProductId { get; set; }

        public Product Product { get; set; }

        public string UserName { get; set;}

    }
}