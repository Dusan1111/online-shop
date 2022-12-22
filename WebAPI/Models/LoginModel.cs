using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public record LoginModel
    {
      
        [Required]
        public string UserName { get; set; }
        
        [Required]
        public string Password { get; set; }

    }
}