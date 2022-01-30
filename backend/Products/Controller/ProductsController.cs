using backend.Data;
using backend.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Products.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly StoreContext _context;

        public ProductsController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts(
            string orderBy,
            string searchTerm,
            string types)
        {
            var query = _context.Products
                .Sort(orderBy)
                .Search(searchTerm)
                .Filter(types)
                .AsQueryable();

            return await query.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound();

            return product;
        }

        //[HttpPost("{id}")]
        //public async Task<ActionResult<Product>> AddProduct([FromBody] Product product)
        //{

        //    _context.Products.Add(new Product()
        //    {
        //        Id = product.Id,
        //        Name = product.Name,
        //        Description = product.Description,
        //        Price = product.Price,
        //        PictureUrl = product.PictureUrl,
        //        Type = product.Type,
        //        Brand = product.Brand,
        //        QuantityInStock = product.QuantityInStock

        //    });

        //    ;

        //    _context.SaveChanges();

        //    return await _context.Products.FindAsync(product.Id);
        //}
    }
}
