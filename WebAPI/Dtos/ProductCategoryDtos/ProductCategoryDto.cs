using System.ComponentModel.DataAnnotations;

namespace WebAPI.Dtos.ProductCategoryDtos
{
    public class ProductCategoryDto
    {
        [Required]
        public int Id { get; init; }
        
        [Required]
        public string Name { get; init; }
    }
}