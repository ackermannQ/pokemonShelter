using backend.Data;
using backend.Extensions;
using backend.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery] ProductParams productParams)
        {
            var query = _context.Products
                .Sort(productParams.OrderBy)
                .Search(productParams.SearchTerm)
                .Filter(productParams.Types)
                .AsQueryable();

            var products = await PagedList<Product>.ToPagedList(query, productParams.PageNumber, productParams.PageSize);
            Response.AddPaginationHeader(products.MetaData);

            return products;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound();

            return product;
        }

        [HttpGet("filters")]
        public async Task<ActionResult> GetFilters()
        {
            var types = await _context.Products.Select(p => p.Type).Distinct().ToListAsync();

            return Ok(new { types });
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
