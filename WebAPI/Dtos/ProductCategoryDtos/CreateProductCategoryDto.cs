
using System.ComponentModel.DataAnnotations;

namespace WebAPI.Dtos.ProductCategoryDtos
{
    public class CreateProductCategoryDto
    { 
        [Required]
        public string Name { get; init; }
    }
}