using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebAPI.Models;

public record OrderItem
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    public double Price { get; set; }

    [Required]
    public int Ammount { get; set; }
    
    [Required]
    public int? ProductId { get; set; }

    [ForeignKey("ProductId")]
    public Product Product{ get; set; }

    //Navigation property ---> one to many Relation
    public int OrderId { get; set; }

    public Order Order { get; set; }
    
}
