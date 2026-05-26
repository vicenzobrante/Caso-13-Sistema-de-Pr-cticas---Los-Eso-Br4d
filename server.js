const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const { ApolloServer } = require('apollo-server-express');

const connectDB = require('./db');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

// Start DB connection
connectDB();

const server = new ApolloServer({ typeDefs, resolvers });

(async () => {
    await server.start();
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    server.applyMiddleware({ app, path: '/graphql' });
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Servidor GraphQL listo en http://localhost:${PORT}${server.graphqlPath}`);
    });
})();