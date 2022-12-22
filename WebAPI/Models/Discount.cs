using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebAPI.Models;

public record Discount
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    public string Name { get; set; }

    [Required]
    public double Ammount { get; set; }

    [Required]
    public int? ProductId { get; set; }

    [ForeignKey("ProductId")]
    public Product Product { get; set; }

    public DiscountType DiscountType { get; set; }
}

public enum DiscountType
{
    Regular,
    Loyalty,
}