using System.ComponentModel.DataAnnotations;

namespace WebAPI.Dtos.ProductCategoryDtos 
{
    public class UpdateProductCategoryDto
    {
        [Required]
        public string Name { get; init; }
    }
}