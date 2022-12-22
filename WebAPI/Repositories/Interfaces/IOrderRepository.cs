

using System.Collections.Generic;

namespace WebAPI.Repositories.Interfaces
{
    public interface IOrderRepository
    {
        IEnumerable<Order> GetOrders();
        Order GetOrder(int id);
        void AddOrder(Order item);
        void UpdateOrder(Order item);
        void DeleteOrder(int id);
    }
}