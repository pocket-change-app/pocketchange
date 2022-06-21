const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const express = require("express");
const { MongoClient } = require ('mongodb');

const uri = "mongodb://localhost:27017/pocketchange";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const database = require('../databases/SQLSchema/db')
const sequelizeConnection = database.sequelize
const User = database.User
const Business = database.Business
const Pocket = database.Pocket
const Change = database.Change
const Transaction = database.Transaction


const mongodatabase = require('../databases/mongoSchema/mongodb')
const mongoUser = mongodatabase.mongoUser
const mongoBusiness = mongodatabase.mongoBusiness
const mongoPocket = mongodatabase.mongoPocket

const typeDefs = require('./typeDefinitions.js')
const resolvers = require('./resolvers.js')

const context = async ({ req }) => {
  return {
    req,
    User,
    Business,
    Pocket,
    Change,
    Transaction,
    mongoUser,
    mongoBusiness,
    mongoPocket
  }
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const app = express();
const server = new ApolloServer({ typeDefs, resolvers, context });
server.start().then(res => {
    server.applyMiddleware({ app }) 
})

//START GRAPHQL SERVER ONCE DATABASE CONNECTED & MODELS AVAILABLE
const port = process.env.PORT || 4000;
sequelizeConnection.authenticate().then(() => {
    console.log('mySQL database connection established successfully')
    client.connect(function (err, db) {
        if (err || !db) {
          return callback(err);
        }
  
        dbConnection = db.db("sample_airbnb");
        console.log("Successfully connected to MongoDB.");
        app.listen(port, () => {
            console.log(`Server ready at ${port}`);
        })
      });
    })