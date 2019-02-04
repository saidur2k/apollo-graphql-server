// const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
// const server = new ApolloServer({ typeDefs, resolvers });
const  express  = require('express');
const { createServer } =  require('http');
const { ApolloServer } = require('apollo-server-express');

// server.listen().then(({ url }) => {
//   console.log(`🚀 Server ready at ${url}`);
// });

const PORT = process.env.PORT ||  4000;

const app = express();

const apolloServer = new ApolloServer({ typeDefs, resolvers });
apolloServer.applyMiddleware({ app });

const httpServer = createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: PORT }, () =>{
  console.log(`🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`)
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${apolloServer.subscriptionsPath}`)
})

