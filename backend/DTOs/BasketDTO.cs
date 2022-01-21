using System.Collections.Generic;

namespace backend.DTOs
{
    public class BasketDTO
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItemsDTO> Items { get; set; }
    }
}
