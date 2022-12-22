using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
using WebAPI.Models;

namespace WebAPI.Models
{
    public class ProductReview
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(500,ErrorMessage ="Maximum length for product review is 500 characters")]
        public string Description { get; set; }

        [Required]
        public double Rating { get; set; }

        //Navigation property ---> one to many Relation
        public int ProductId { get; set; }

        public Product Product { get; set; }

        public string? IdentityUserId { get; set; }

        [ForeignKey("IdentityUserId")]
        public IdentityUser? IdentityUser { get; set; }
    }
}