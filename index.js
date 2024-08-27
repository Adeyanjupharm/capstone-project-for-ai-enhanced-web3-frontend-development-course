const { ApolloServer, gql } = require('apollo-server');
 
//Implement GraphQL Schema
const typeDefs = gql`
  type CryptoPrice {
    id: ID!
    name: String
    usdPrice: Float
  }
 
  type Query {
    getCryptoPrices: [CryptoPrice]
  }
`;
 
 
//Implement GraphQL Resolver
const resolvers = {
    Query: {
      getCryptoPrices: async () => {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,litecoin,jupiter&vs_currencies=usd');
        const prices = await response.json();
        return Object.keys(prices).map(key => ({
          id: key,
          name: key,
          usdPrice: prices[key].usd,
        }));
      },
    },
  };
 
   
// Start the server
const server = new ApolloServer({ typeDefs, resolvers });
server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});