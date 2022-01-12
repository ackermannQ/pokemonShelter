using backend.Products;
using Microsoft.Data.SqlClient;
using System;

namespace backend.Command
{
    public class CreateProductCommandHandler
    {
        private readonly SqlConnection connection;

        public CreateProductCommandHandler(SqlConnection connection)
        {
            this.connection = connection;
        }

        public void Handle(Product product)
        {
            try
            {
                string query = @$"insert into Products (Id, Name, Description, Price) values ('{product.Id}', '{product.Name}', '{product.Description}', '{product.Price}')";

                SqlCommand cmd = new SqlCommand(query, this.connection);

                this.connection.Open();

                SqlDataReader dr = cmd.ExecuteReader();

                dr.Close();
            }
            catch (SqlException e)
            {
                Console.WriteLine(e);
            }
        }
    }
}
