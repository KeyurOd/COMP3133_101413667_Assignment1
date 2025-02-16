const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

async function startServer() {
    const server = new ApolloServer({ typeDefs, resolvers });

    await server.start();
    server.applyMiddleware({ app });

    await connectDB();

    app.listen(4000, () => console.log("🚀 Server running at http://localhost:4000/graphql"));
}

startServer();
