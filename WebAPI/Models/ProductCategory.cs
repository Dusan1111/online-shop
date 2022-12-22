using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class ProductCategory
    {
        public int Id { get; set; }

        [Required]
        [Display(Name = "Product category")]
        [MaxLength(100,ErrorMessage ="Maximum length for product category name is 100 characters")]
        public string Name { get; set; }
    }
}