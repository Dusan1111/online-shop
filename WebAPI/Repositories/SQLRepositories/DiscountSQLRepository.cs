using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using WebAPI.Repositories.Interfaces;

namespace WebApi.Repositories.SQLRepositories
{
    public class DiscountSQLRepository : IDiscountRepository
    {
        private readonly OnlineShopDbContext context;

        public DiscountSQLRepository(OnlineShopDbContext context)
        {
            this.context = context;
        }

        public void AddDiscount(Discount discount)
        {
            context.Discounts.Add(discount);
            context.SaveChanges();
        }

        public void DeleteDiscount(int id)
        {
            var productDiscount = context.Discounts.Find(id);

            if (productDiscount is not null)
            {
                context.Discounts.Remove(productDiscount);
                context.SaveChanges();
            }
        }

        public IEnumerable<Discount> GetDiscounts()
        {
            return context.Discounts.Include(discount => discount.Product);
        }

        public Discount GetDiscount(int id)
        {
            return context.Discounts.Include(discount => discount.Product).FirstOrDefault(x => x.Id == id);
        }
        public void UpdateDiscount(Discount discountChanges)
        {
            context.Entry(discountChanges).State = EntityState.Detached;
            context.Entry(discountChanges).State = EntityState.Modified;
            context.SaveChanges();
        }
    }
}