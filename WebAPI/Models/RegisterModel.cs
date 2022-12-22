using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public record RegisterModel
    {
        [Required]
        public string UserName { get; set; }
        
        [Required]
        public string Password { get; set; }

        [Required]
        public string Email { get; set; }

    }
}