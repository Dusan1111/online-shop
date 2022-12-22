using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using WebApi.Extensions;
using WebAPI.Dtos.ProductReviewDtos;
using WebAPI.Models;
using WebAPI.Repositories.Interfaces;


namespace WebAPI.Controllers
{
    [ApiController]
    [Route("statistics")]
    public class StatisticsController
    {
        private IOrderRepository repository;
        private IWebHostEnvironment environment;

        public StatisticsController(IOrderRepository repository, IWebHostEnvironment environment)
        {
            this.repository = repository;
            this.environment = environment;
        }

        [HttpGet("{year:int}")]
        public Dictionary<string, double> GetStatisticsData(int year)
        {
             Dictionary<string, double> graphData = new Dictionary<string, double>()
            {
               {"January", 0}, {"February", 0}, {"March", 0}, {"April", 0}, {"May", 0},
               {"June", 0}, {"July", 0}, {"August", 0}, {"September", 0}, {"October", 0},
               {"November", 0}, {"December", 0}
            };

            var orders = repository.GetOrders();
           
           foreach (var order in orders)
           {   
              double orderValue;
              if(graphData.TryGetValue(order.OrderTime.ToString("MMMM"), out orderValue) && order.OrderTime.Year == year)
              {
                orderValue = order.Total;
                graphData[order.OrderTime.ToString("MMMM")] += orderValue;
              }
           }
           
           return graphData;
        }

    }
}