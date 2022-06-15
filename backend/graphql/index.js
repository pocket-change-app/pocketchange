const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const express = require("express");

const database = require('../databases/SQLSchema/db')
const sequelizeConnection = database.sequelize
const User = database.User
const Business = database.Business
const Pocket = database.Pocket
const Change = database.Change
const Transaction = database.Transaction

const typeDefs = require('./typeDefinitions.js')
const resolvers = require('./resolvers.js')

const context = async ({ req }) => {
  return {
    req,
    User,
    Business,
    Pocket,
    Change,
    Transaction
  }
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const app = express();
const server = new ApolloServer({ typeDefs, resolvers, context });
server.start().then(res => {
    server.applyMiddleware({ app }) 
})

app.use(express.static(path.join(__dirname, "../../frontend/web-build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/web-build/index.html"));
});

//START GRAPHQL SERVER ONCE DATABASE CONNECTED & MODELS AVAILABLE
const port = process.env.PORT || 4000;
sequelizeConnection.authenticate().then(() => {
    console.log('mySQL database connection established successfully')
    app.listen(port, () => {
      console.log(`Server ready at ${port}`);
    })
})