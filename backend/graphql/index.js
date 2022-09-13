const express = require("express");
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
//const Mongoose = require('mongoose');
const { MongoClient } = require ('mongodb');

//get SQL data
const database = require('../databases/SQLSchema/db')
const sequelizeConnection = database.sequelize
//entities
const User = database.User
const Business = database.Business
const Pocket = database.Pocket
const ChangeBalance = database.ChangeBalance
const Transaction = database.Transaction
const Geolocation = database.Geolocation
//relationships
const IsIn = database.IsIn
const IsMember = database.IsMember
const Loves = database.Loves
const WorksAt = database.WorksAt

//get Mongo Data
const mongodatabase = require('../databases/mongoSchema/mongodb')
const mongoose = mongodatabase.mongoose
const mongoUser = mongoose.model('mongoUser')
const mongoBusiness = mongoose.model('mongoBusiness')
const mongoPocket = mongoose.model('mongoPocket')

//get type definitions and resolvers
const typeDefs = require('./typeDefinitions.js')
const resolvers = require('./resolvers.js')

const context = async ({ req }) => {
  return {
    req,
    //entity schema SQL
    User,
    Business,
    Pocket,
    ChangeBalance,
    Transaction,
    Geolocation,
    //relationship schema SQL
    IsIn,
    IsMember,
    Loves,
    WorksAt,
    //sequelize connection for functions
    sequelizeConnection,
    //schema Mongo
    mongoUser,
    mongoBusiness,
    mongoPocket,
    //mongoose connection
    mongoose,

  }
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const app = express();
const server = new ApolloServer({ typeDefs, resolvers,  csrfPrevention: true, context });


server.start().then(res => { 
  server.applyMiddleware({
    app,
  });
})

//START GRAPHQL SERVER ONCE DATABASE CONNECTED & MODELS AVAILABLE
const port = process.env.PORT || 4000;
mongoose.once('open', () => {
  console.log('Database connection open')
  sequelizeConnection.authenticate().then(() => {
    console.log('mySQL database connection established successfully')
        app.listen(port, () => {
            console.log(`Server ready at ${port}`);
        })
    })
})
