
using System.ComponentModel.DataAnnotations;

namespace WebAPI.Dtos.OrderDtos
{
    public class OrderDto
    { 
        [Required]
        public int Id { get; init; }
        
 
    }
}