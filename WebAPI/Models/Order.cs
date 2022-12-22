using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebAPI.Models;
using Microsoft.AspNetCore.Identity;
using System;

public record Order
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    public double Total { get; set; }

    [Required]
    public int PostalCode { get; set; }

    [Required]
    public string ShippingAdress { get; set; }

    [Required]
    public List<OrderItem> OrderItems { get; set; }

    [Required]
    public string Status { get; init; }

    public string? IdentityUserId { get; set; }

    [ForeignKey("IdentityUserId")]
    public IdentityUser? IdentityUser { get; set; }

    public DateTime OrderTime { get; set; }

}
