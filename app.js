const typeDefs = require('./src/schema');
const resolvers = require('./src/resolvers');

const { ApolloServer } = require('apollo-server');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  engine: {
    apiKey: process.env.ENGINE_API_KEY,
    schemaTag: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
