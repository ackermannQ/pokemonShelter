using backend.Products;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;

namespace backend.Command
{
    public class SelectAllProductsCommandHandler
    {
        private readonly SqlConnection connection;

        public SelectAllProductsCommandHandler(SqlConnection connection)
        {
            this.connection = connection;
        }

        public List<Product> Handle()
        {
            string query = @$"Select Id, Name, Description, Price from Products";

            SqlCommand cmd = new SqlCommand(query, connection);

            try
            {
                connection.Open();

                SqlDataReader dr = cmd.ExecuteReader();

                var products = new List<Product>();

                while (dr.Read())
                {
                    products.Add(new Product
                    {
                        Id = (int)dr.GetValue(0),
                        Name = dr.GetValue(1).ToString(),
                        Description = dr.GetValue(2).ToString(),
                        Price = dr.GetDecimal(3)
                    });
                }

                dr.Close();

                return products;
            }
            catch (SqlException e)
            {
                throw e;
            }
        }
    }
}
