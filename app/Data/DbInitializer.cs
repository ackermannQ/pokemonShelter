using backend.Products;
using System.Collections.Generic;
using System.Linq;

namespace backend.Data
{
    public static class DbInitializer
    {
        public static void Initialize(StoreContext context)
        {
            if (context.Products.Any()) return;

            var products = new List<Product>()
            {
                new Product
                {
                    Name = "Pikachu",
                    Description =
                        "Sweet little Electric mouse that will greatly improve your life by bringing sparkles in it!",
                    Price = 20000,
                    PictureUrl = "/images/products/pikachu.png",
                    Type = "Electrik",
                    QuantityInStock = 4
                },
                new Product
                {
                    Name = "Nidoking",
                    Description =
                        "When it goes on a rampage, it’s impossible to control. But in the presence of a Nidoqueen it’s lived with for a long time, Nidoking calms down.",
                    Price = 80000,
                    PictureUrl = "/images/products/nidoking.png",
                    Type = "Poison, Ground",
                    QuantityInStock = 2
                },
                new Product
                {
                    Name = "Kadabra",
                    Description =
                        "Using its psychic power, Kadabra levitates as it sleeps. It uses its springy tail as a pillow.",
                    Price = 35000,
                    PictureUrl = "/images/products/kadabra.png",
                    Type = "Psychic",
                    QuantityInStock = 3
                },
                new Product
                {
                    Name = "Golem",
                    Description =
                        "Once it sheds its skin, its body turns tender and whitish. Its hide hardens when it’s exposed to air.",
                    Price = 80000,
                    PictureUrl = "/images/products/golem.png",
                    Type = "Rock, Ground",
                    QuantityInStock = 5
                },
                new Product
                {
                    Name = "Rapidash",
                    Description =
                        "This Pokémon can be seen galloping through fields at speeds of up to 150 mph, its fiery mane fluttering in the wind.",
                    Price = 45000,
                    PictureUrl = "/images/products/rapidash.png",
                    Type = "Fire",
                    QuantityInStock = 7
                },
                new Product
                {
                    Name = "Gengar",
                    Description =
                        "On the night of a full moon, if shadows move on their own and laugh, it must be Gengar’s doing.",
                    Price = 40000,
                    PictureUrl = "/images/products/gengar.png",
                    Type = "Ghost, Poison",
                    QuantityInStock = 3
                },
                new Product
                {
                    Name = "Eevee",
                    Description =
                        "It has the ability to alter the composition of its body to suit its surrounding environment.",
                    Price = 20000,
                    PictureUrl = "/images/products/eevee.png",
                    Type = "Normal",
                    QuantityInStock = 4
                },
            };

            products.ForEach(product =>
            {
                context.Products.Add(product);
            });

            context.SaveChanges();
        }
    }
}
