using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using WebAPI.Repositories.Interfaces;

namespace WebApi.Repositories.SQLRepositories
{
    public class OrderSQLRepository : IOrderRepository
    {
        private readonly OnlineShopDbContext context;

        public OrderSQLRepository(OnlineShopDbContext context)
        {
            this.context = context;
        }

        public void AddOrder(Order order)
        {
            foreach(var orderItem in order.OrderItems)
            {
                context.OrderItems.Add(orderItem);
            }
            context.Orders.Add(order);
            context.SaveChanges();
        }

        public void DeleteOrder(int id)
        {
            var order = context.Orders.Find(id);

            if (order is not null)
            {
                context.Orders.Remove(order);
                context.SaveChanges();
            }
        }

        public IEnumerable<Order> GetOrders()
        {
            return context.Orders.Include(order => order.IdentityUser).Include(order => order.OrderItems).ThenInclude(order => order.Product);
        }

        public Order GetOrder(int id)
        {
            return context.Orders.Include(order => order.OrderItems).ThenInclude(order => order.Product).FirstOrDefault(x => x.Id == id);
        }
        
        public void UpdateOrder(Order orderChanges)
        {
            context.Entry(orderChanges).State = EntityState.Detached;
            context.Entry(orderChanges).State = EntityState.Modified;
            context.SaveChanges();
        }
    }
}