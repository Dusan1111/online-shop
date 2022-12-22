using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using WebAPI.Models;
using WebAPI.Repositories.Interfaces;
using Microsoft.AspNetCore.Hosting;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("discounts")]
    public class DiscountController : ControllerBase
    {
        private IDiscountRepository repository;
        private IWebHostEnvironment environment;

        public DiscountController(IDiscountRepository repository, IWebHostEnvironment environment)
        {
            this.repository = repository;
            this.environment = environment;
        }

        // discounts
        [HttpGet]
        public IEnumerable<Discount> GetDiscounts()
        {
           return repository.GetDiscounts();
        }

        // discounts/{id}
        [HttpGet("{id}")]
        public ActionResult<Discount> GetDiscount(byte id)
        {
            var item = repository.GetDiscount(id);

            if (item is null)
            {
                return NotFound();
            }
            return item;
        }

        //POST/discounts
        [HttpPost]
        public ActionResult<Discount> AddDiscount(Discount discount)
        {
            Discount newDiscount = new()
            {
                Name = discount.Name,
                ProductId = discount.ProductId,
                DiscountType = discount.DiscountType
            };

            repository.AddDiscount(newDiscount);

            return CreatedAtAction(nameof(GetDiscount), new { id = newDiscount.Id }, newDiscount);
        }

        //PUT/discounts/id
        [HttpPut("{id}")]
        public ActionResult<Discount> UpdateDiscount(int id, Discount discount)
        {
            if (discount is null)
            {
                return NotFound();
            }

            Discount discountChanges = new Discount()
            {
                Id = id,
                Name = discount.Name,
                ProductId = discount.ProductId
            };

            repository.UpdateDiscount(discountChanges);

            return NoContent();
        }

        //Delete/discounts/id
        [HttpDelete("{id}")]
        public ActionResult DeleteDiscount(int id)
        {
            var existingItem = repository.GetDiscount(id);

            if (existingItem is null)
            {
                return NotFound();
            }

            repository.DeleteDiscount(id);

            return NoContent();
        }

    }
}