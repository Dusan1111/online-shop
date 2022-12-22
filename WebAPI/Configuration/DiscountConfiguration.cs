using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace WebAPI.Configuration
{
    public class DiscountConfiguration : IEntityTypeConfiguration<Discount>
    {
        //konvertuje DiscountType enumeraciju u string
        public void Configure(EntityTypeBuilder<Discount> builder)
        {
            builder.Property(b => b.DiscountType).HasConversion(convertToProviderExpression: c => c.ToString(), convertFromProviderExpression: c => Enum.Parse<DiscountType>(c));
        }
    }
}