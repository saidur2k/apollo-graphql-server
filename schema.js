const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    products: [Product]
    product(id: Int!): Product
  }

  type Product {
    id: Int,
    name: String,
    description: String
  }

  input ProductInput {
    name: String,
    description: String
  }

  type Mutation {
    login(email: String): String,
    createProduct(product: ProductInput): Product
  }
`;

module.exports = typeDefs;