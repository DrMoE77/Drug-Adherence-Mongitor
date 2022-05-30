// importing dependencies
const express = require('express');
// import ApolloServer
const { ApolloServer } = require('apollo-server-express');
const path = require('path'); 
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

// port for server
const PORT = process.env.PORT || 3001;
const app = express();

const { authMiddleware } = require('./utils/auth');

// passing schema data to the server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

// express integrated with apollo server
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serving static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// opening the db to run on 3001 and react on 3000
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    // log where we can go to test our GQL API
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});