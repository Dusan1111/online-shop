using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Repositories.Interfaces;

namespace WebAPI.Controllers
{ 
    [ApiController]
    [Route("order")]
    public class OrderController : ControllerBase
    {
        private IOrderRepository repository;
        private IWebHostEnvironment environment;
        
        public OrderController(IOrderRepository repository, IWebHostEnvironment environment)
        {
            this.repository = repository;
            this.environment = environment;
        }
        
        // order
        [HttpGet("{id:Guid}")]
        public IEnumerable<Order> GetOrdersForCusomer(string id)
        {
            if(string.IsNullOrEmpty(id))
            {
              return repository.GetOrders();
            }
            return repository.GetOrders().Where(x=> x.IdentityUserId != null && x.IdentityUserId.Equals(id));
        }

         // order
        [HttpGet()]
        public IEnumerable<Order> GetOrders()
        {
            return repository.GetOrders();
        }

        // order/{id}
        [HttpGet("{id:int}")]
        public ActionResult<Order> GetOrder(int id)
        {
            var order = repository.GetOrder(id);

            if (order is null)
            {
                return NotFound();
            }
            return order;
        }

        //POST/order
        [HttpPost]
        public ActionResult<Order> AddOrder(Order order)
        {
            Order newOrder = new()
            {
                PostalCode = order.PostalCode,
                ShippingAdress = order.ShippingAdress,
                Total = order.Total,
                OrderItems = order.OrderItems,
                Status = "Inital",
                OrderTime = DateTime.Now
            };

            repository.AddOrder(newOrder);
            return CreatedAtAction(nameof(GetOrder), new { id = newOrder.Id }, newOrder);
        }

        //PUT/order/id
        [HttpPut("{id}")]
        public ActionResult<Order> UpdateOrder(int id, Order order)
        {
            if (order is null)
            {
                return NotFound();
            }

            Order orderChanges = new Order()
            {
                Id = id,
                PostalCode = order.PostalCode,
                ShippingAdress = order.ShippingAdress,
                Total = order.Total,
                OrderItems = order.OrderItems,
                Status = order.Status
            };

            repository.UpdateOrder(orderChanges);

           return CreatedAtAction(nameof(GetOrder), new { id = orderChanges.Id }, orderChanges);
        }
    }
}