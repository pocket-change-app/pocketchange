const { ApolloServer } = require('apollo-server-express');
const path = require('path');
//const Mongoose = require('mongoose');
const express = require("express");
const { MongoClient } = require ('mongodb');

const database = require('../databases/SQLSchema/db')
const sequelizeConnection = database.sequelize
const User = database.User
const Business = database.Business
const Pocket = database.Pocket
const PocketManager = database.PocketManager
const Change = database.Change
const Transaction = database.Transaction


const mongodatabase = require('../databases/mongoSchema/mongodb')
const mongoose = mongodatabase.mongoose
const mongoUser = mongoose.model('mongoUser')
const mongoBusiness = mongoose.model('mongoBusiness')
const mongoPocket = mongoose.model('mongoPocket')
const mongoPocketManager = mongoose.model('mongoPocketManager')

const typeDefs = require('./typeDefinitions.js')
const resolvers = require('./resolvers.js')

const context = async ({ req }) => {
  return {
    req,
    User,
    Business,
    Pocket,
    PocketManager,
    Change,
    Transaction,
    mongoUser,
    mongoBusiness,
    mongoPocket, 
    mongoPocketManager,
    sequelizeConnection
  }
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const app = express();
const server = new ApolloServer({ typeDefs, resolvers, context });
server.start().then(res => {
    server.applyMiddleware({ app }) 
    console.log("RES", res)
})

//START GRAPHQL SERVER ONCE DATABASE CONNECTED & MODELS AVAILABLE
const port = process.env.PORT || 4000;
mongoose.once('open', () => {
  console.log('Database connection open')
  // DROP DATABASES
  sequelizeConnection.authenticate().then(() => {
    console.log('mySQL database connection established successfully')
        app.listen(port, () => {
            console.log(`Server ready at ${port}`);
        })
    })
})
