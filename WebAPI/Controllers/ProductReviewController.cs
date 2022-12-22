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
    [Route("productReview")]
    public class ProductReviewController: ControllerBase
    {
        private IProductReviewRepository repository;
        private IWebHostEnvironment environment;
        
        public ProductReviewController(IProductReviewRepository repository, IWebHostEnvironment environment)
        {
            this.repository = repository;
            this.environment = environment;
        }

        [HttpGet("{productId:int}")]
        public IEnumerable<ProductReviewDto> GetProductReviews(int productId)
        {
            return repository.GetProductReviews(productId).Select(item => item.AsDto());
        }

        //POST/order
        [HttpPost]
        public ActionResult<ProductReview> AddProductReview(ProductReview productReview)
        {
            ProductReview newProductReview = new()
            {
              Description = productReview.Description,
              ProductId = productReview.ProductId,
              Rating = productReview.Rating,
              IdentityUserId = productReview.IdentityUserId,
              IdentityUser = productReview.IdentityUser
            };

            repository.AddProductReview(newProductReview);
            return CreatedAtAction(nameof(AddProductReview), new { id = newProductReview.Id }, newProductReview);
        }
    }   
}