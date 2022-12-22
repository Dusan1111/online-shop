using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Collections.Generic;
using WebAPI.Dtos.ProductDtos;
using WebAPI.Models;
using WebApi.Extensions;
using WebAPI.Repositories.Interfaces;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using System;
using Microsoft.AspNetCore.Authorization;

namespace WebAPI.Controllers
{

    [ApiController]
    [Route("products")]
    public class ProductController : ControllerBase
    {
        private IProductRepository repository;
        private IWebHostEnvironment environment;

        public ProductController(IProductRepository repository, IWebHostEnvironment environment)
        {
            this.repository = repository;
            this.environment = environment;
        }

        // products
        [HttpGet]
        public IEnumerable<ProductDto> GetProducts()
        {
           return repository.GetProducts().Select(item => item.AsDto());
        }

        // products/{id}
        [HttpGet("{id}")]
        public ActionResult<ProductDto> GetProduct(byte id)
        {
            var item = repository.GetProduct(id).AsDto();

            if (item is null)
            {
                return NotFound();
            }
            return item;
        }

        //POST/products
        [HttpPost]
        public ActionResult<ProductDto> AddProduct(CreateProductDto productDto)
        {
            Product newProduct = new()
            {
                Name = productDto.Name,
                Price = productDto.Price,
                Ammount = productDto.Ammount,
                ProductCategoryId = productDto.ProductCategoryId,
                ImageName = productDto.ImageName,
                Description = productDto.Description,
                Discount = productDto.Discount,
            };
            newProduct.CalculateDiscountedPrice();

            repository.AddProduct(newProduct);
            return CreatedAtAction(nameof(GetProduct), new { id = newProduct.Id }, newProduct.AsDto());
        }

        //PUT/products/id
        [HttpPut("{id}")]
        public ActionResult<UpdateProductDto> UpdateProduct(int id, UpdateProductDto productDto)
        {
            if (productDto is null)
            {
                return NotFound();
            }

            Product productChanges = new Product()
            {
                Id = id,
                Name = productDto.Name,
                Price = productDto.Price,
                ProductCategoryId = productDto.ProductCategoryId,
                ImageName = productDto.ImageName,
                Description = productDto.Description,
                Discount = productDto.Discount
            };

            productChanges.CalculateDiscountedPrice();
            repository.UpdateProduct(productChanges);

            return NoContent();
        }


        //Delete/products/id
        [HttpDelete("{id}")]
        public ActionResult DeleteProduct(int id)
        {
            var existingItem = repository.GetProduct(id);

            if (existingItem is null)
            {
                return NotFound();
            }

            repository.DeleteProduct(id);

            return NoContent();
        }

        [Route("SaveImage")]
        [HttpPost]
        public JsonResult SaveImage()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string fileName = postedFile.FileName;
                var physicalPath = environment.ContentRootPath + "/Images/" + fileName;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }
                
                return new JsonResult(fileName);
            }
            catch (Exception)
            {
                return new JsonResult("questionMark.png");
            }
        }
    }

}