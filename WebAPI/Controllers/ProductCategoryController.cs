using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Collections.Generic;
using WebAPI.Models;
using WebApi.Extensions;
using WebAPI.Dtos.ProductCategoryDtos;
using WebAPI.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace WebAPI.Controllers
{

    [ApiController]
    [Route("productCategories")]
    public class ProductCategoryController : ControllerBase
    {
        private IProductCategoryRepository repository;
        public ProductCategoryController(IProductCategoryRepository repository)
        {
            this.repository = repository;
        }

        // productCategories
        [HttpGet]
        public IEnumerable<ProductCategoryDto> GetProductCategories()
        {
            return repository.GetProductCategories().Select(item => item.AsDto());
        }

        // productCategories/{id}
        [HttpGet("{id}")]
        public ActionResult<ProductCategoryDto> GetProductCategory(int id)
        {
            var productCategory = repository.GetProductCategory(id).AsDto();

            if (productCategory is null)
            {
                return NotFound();
            }
            return productCategory;
        }

        //POST/productCategories
        [HttpPost]
        public ActionResult<ProductCategoryDto> AddProductCategory(CreateProductCategoryDto categoryDto)
        {
            ProductCategory category = new()
            {
                Name = categoryDto.Name,
            };
            repository.AddProductCategory(category);

            return CreatedAtAction(nameof(GetProductCategory), new { id = category.Id }, category.AsDto());
        }

        //PUT/productCategories/id
        [HttpPut("{id}")]
        public ActionResult<UpdateProductCategoryDto> UpdateProductCategory(int id, UpdateProductCategoryDto categoryDto)
        {
            if (categoryDto is null)
            {
                return NotFound();
            }

            ProductCategory categoryChanges = new ProductCategory()
            {
                Id = id,
                Name = categoryDto.Name,
            };

            repository.UpdateProductCategory(categoryChanges);

            return NoContent();
        }


        //delete/productCategories/id
        [HttpDelete("{id}")]
        public ActionResult DeleteProductCategory(int id)
        {
            var existingItem = repository.GetProductCategory(id);

            if (existingItem is null)
            {
                return NotFound();
            }

            repository.DeleteProductCategory(id);

            return NoContent();
        }

    }
}