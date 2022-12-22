using System.Collections.Generic;
using WebAPI.Models;

namespace WebAPI.Repositories.Interfaces
{
    public interface IDiscountRepository
    {
        IEnumerable<Discount> GetDiscounts();
        Discount GetDiscount(int id);
        void AddDiscount(Discount item);
        void UpdateDiscount(Discount item);
        void DeleteDiscount(int id);
    }
}